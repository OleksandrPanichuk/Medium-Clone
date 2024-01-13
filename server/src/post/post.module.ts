import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostCommentModule } from './comments/comments.module';
import { ClapsModule } from './claps/claps.module';
import { SubscriptionModule } from '@/user/subscription/subscription.module';

@Module({
  imports: [PostCommentModule, ClapsModule, SubscriptionModule],
  providers: [PostResolver, PostService],
})
export class PostModule  {}
