import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionResolver } from './subscription.resolver';

@Module({
  controllers:[SubscriptionController],
  providers: [SubscriptionService, SubscriptionResolver],
  exports: [SubscriptionService],

})
export class SubscriptionModule {}
