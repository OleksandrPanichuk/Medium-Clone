import { Controller, Headers, Post, RawBodyRequest, Req } from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { Request } from "express";



@Controller('')
export class SubscriptionController {
    constructor(private subscriptionService: SubscriptionService){}

    @Post('/webhook')
	public subscribeWebhook(
		@Headers('Stripe-Signature') signature: string,
        @Req() request: RawBodyRequest<Request>
	) {
		return this.subscriptionService.webhook(request.rawBody, signature)
	}
}