import { PrismaService } from "@/common/prisma/prisma.service";
import { DEFAULT_LIST_NAME, Queues } from "@/shared/constants";
import { Process, Processor , } from "@nestjs/bull";
import { Job  } from "bull";

export enum AuthQueue  {
    INITIALIZE_LISTS = 'init-lists'
}


@Processor(Queues.AUTH) 
export class AuthProcessor {

    constructor(private readonly prisma:PrismaService) {}
    
    @Process(AuthQueue.INITIALIZE_LISTS)
    async initializeLists(job: Job<{userId:string}>) {
        const existingList =  await this.prisma.lists.findFirst({
			where: {
				name:DEFAULT_LIST_NAME,
				creatorId:job.data.userId
			}
		})
        if(existingList) {
            return 
        }

        await this.prisma.lists.create({
            data: {
                name: DEFAULT_LIST_NAME,
                creatorId: job.data.userId
            }
        })
    }
}