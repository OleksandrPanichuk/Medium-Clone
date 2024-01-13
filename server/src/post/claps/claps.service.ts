import { PrismaService } from "@/common/prisma/prisma.service";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PostClap } from "./claps.entity";
import { generateErrorResponse } from "@/common/helpers";
import { FindPostClapsInput, TogglePostClapsInput, TogglePostClapsResponse } from "./dto";



@Injectable()
export class ClapsService {
    constructor(private prisma: PrismaService) {}

    public async findPostClaps(input:FindPostClapsInput) :Promise<PostClap[]> {
		try {
			return await this.prisma.postClaps.findMany({
				where:input
			})
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

    public async toggleClaps(input:TogglePostClapsInput,verified:boolean) : Promise<TogglePostClapsResponse>  {
		try {
			if(!verified) throw new ForbiddenException("User is not verified")

			const existingClap = await this.prisma.postClaps.findFirst({
				where: input
			})
			if(existingClap) {
				await this.prisma.postClaps.delete({
					where: {
						id:existingClap.id
					}
				})
				const post = await this.prisma.posts.findUnique({
					where: {
						id:input.postId
					},
					select: {
						_count: {
							select: {
								claps:true
							}
						}
					}
				})
				return post
			}

			const newClap = await this.prisma.postClaps.create({
				data: input,
				include: {
					post: {
						select: {
							_count : {
								select: {
									claps:true
								}
							}
						}
					}
				}
			})
			

			return {_count:newClap.post._count, id:newClap.id}
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
}