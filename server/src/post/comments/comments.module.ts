import {Module} from '@nestjs/common'
import { PostCommentResolver } from './comments.resolver';
import { PostCommentService } from './comments.service';

@Module({
    providers:[PostCommentResolver, PostCommentService]
})
export class PostCommentModule {}