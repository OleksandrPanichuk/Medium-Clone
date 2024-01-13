import {  generateErrorResponse } from "@/common/helpers";
import { PrismaService } from "@/common/prisma/prisma.service";
import { ForbiddenException, Inject, Injectable, NotFoundException,  } from "@nestjs/common";
import { PostCommentEntity, PostCommentEntityWithCreator } from "./comments.entity";
import { CreatePostCommentInput, DeletePostCommentInput, FindAllPostCommentsQuery, UpdatePostCommentClapsInput, UpdatePostCommentClapsResponse } from "./dto";
import { FullPostEntity } from "../post.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { User } from "@prisma/client";




@Injectable()
export class PostCommentService {
    constructor(private prisma:PrismaService, @Inject(CACHE_MANAGER) private cacheManager:Cache){}

    public async findAll(query:FindAllPostCommentsQuery) : Promise<PostCommentEntityWithCreator[]> {
        try {
            return  await this.prisma.postComments.findMany({
                where: {
                    postId:query.postId,
                    ...(query.comments && {
                        id: {
                            notIn:query.comments
                        }
                    }),
                    ...(query.creatorId && {creatorId:query.creatorId})
                },
                include: {
                    creator:true,
                },
                take:query.take,
                ...(query.sortBy && {
                    orderBy: {
                        [query.sortBy]: 'desc' 
                    }
                })
            })
        } catch (err) {
            throw generateErrorResponse(err)
        }
    }


    public async create(input:CreatePostCommentInput ,creator:User): Promise<PostCommentEntity> {
        try {
            if(!creator.verified) throw new ForbiddenException('User is not verified')

            const comment =  await this.prisma.postComments.create({
                data:{
                    ...input,
                    creatorId:creator.id
                }
            })
            const cachedPost = await this.cacheManager.get(input.postId) as undefined | FullPostEntity
            if(cachedPost) {
                cachedPost._count.comments = cachedPost._count.comments + 1
                await this.cacheManager.set(input.postId, cachedPost)
            }
            return comment
        } catch (err) {
            throw generateErrorResponse(err)
        }
    }

    public async updateClaps(input:UpdatePostCommentClapsInput): Promise<UpdatePostCommentClapsResponse> {
        try {
            return await this.prisma.postComments.update({
                where: {
                    id:input.commentId
                },
                data: {
                    claps:{
                        increment: 1
                    }
                },
                select: {
                    id:true,
                    claps:true
                }
            })
        } catch (err) {
            throw generateErrorResponse(err)
        }
    }

    public async delete(input:DeletePostCommentInput, userId:string) {
        try {
            
            const comment =  await this.prisma.postComments.delete({
                where: {
                    id:input.commentId,
                    creatorId:userId
                }
            })

            if(!comment) throw new NotFoundException('No comment found to delete')

            const cachedPost = await this.cacheManager.get(comment.postId) as undefined | FullPostEntity
            
            if(cachedPost && cachedPost._count.comments > 0) {
                cachedPost._count.comments = cachedPost._count.comments - 1
                await this.cacheManager.set(comment.postId, cachedPost)
            }
            
            return comment
        } catch (err) {
            throw generateErrorResponse(err)
        }
    }
}