import { Stripe, TypeStripe, generateErrorResponse } from '@/common/helpers'
import { PrismaService } from '@/common/prisma/prisma.service'
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common'
import { SubscribeInput } from './dto'
import { User } from '@prisma/client'
import StripePrimary from 'stripe'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class SubscriptionService {
	private stripe: TypeStripe

	constructor(
		private prisma: PrismaService,
		private config: ConfigService
	) {
		this.stripe = Stripe.getInstance()
	}

	public async checkSubscription(userId: string) {
		try {
			const subscription = await this.prisma.subscription.findUnique({
				where: {
					userId
				}
			})
			return !!subscription
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async subscribeOrManage(input: SubscribeInput, user: User): Promise<string> {
		const existingSubscription = await this.prisma.subscription.findUnique({
			where: {
				userId: user.id
			}
		})

		if (existingSubscription && existingSubscription.stripeCustomerId) {
			const stripeSession = await this.stripe.billingPortal.sessions.create({
				customer: existingSubscription.stripeCustomerId,
				return_url: input.redirectUrl
			})

			return stripeSession.url 
		}

		const stripeSession = await this.stripe.checkout.sessions.create({
			success_url: input.redirectUrl,
			cancel_url: input.redirectUrl,
			payment_method_types: ['card', 'paypal'],
			mode: 'subscription',
			billing_address_collection: 'auto',
			customer_email: user.email,
			line_items: [
				{
					price_data: {
						currency: 'USD',
						product_data: {
							name: 'Subscription - Podium',
							description:
								'A subscription to Podium will give you a wide range of features in our app'
						},
						unit_amount: 10,
						recurring: {
							interval: 'month'
						}
					},
					quantity: 1
				}
			],
			metadata: {
				userId: user.id
			}
		})
		return  stripeSession.url 
	}

	public async webhook(body: Buffer, signature: string) {
		try {
			let event: StripePrimary.Event
			try {
				event = this.stripe.webhooks.constructEvent(
					body,
					signature as string,
					this.config.get<string>('STRIPE_WEBHOOK_ID')
				)
			} catch (err) {
				throw new InternalServerErrorException('Webhook error', {
					cause: err instanceof Error ? err.message : 'Unknown Error'
				})
			}
			const session = event.data.object as StripePrimary.Checkout.Session & {
				metadata: {
					userId: string
				}
			}

			
				
			if (event.type === 'checkout.session.completed') {
				const subscription = await this.stripe.subscriptions.retrieve(
					session.subscription as string
				)
				if (!session.metadata.userId) {
					throw new BadRequestException('Webhook was called without user')
				}
				await this.prisma.subscription.create({
					data: {
						stripeSubscriptionId: subscription.id,
						stripeCustomerId: subscription.customer as string,
						stripePriceId: subscription.items.data[0]?.price.id,
						stripeCurrentPeriodEnd: new Date(
							subscription.current_period_end * 1000
						),
						userId: session.metadata.userId
					}
				})
			}

			if (event.type === 'invoice.payment_succeeded') {
				const subscription = await this.stripe.subscriptions.retrieve(
					session.subscription as string
				)
				await this.prisma.subscription.update({
					where: {
						stripeSubscriptionId: subscription.id
					},
					data: {
						stripePriceId: subscription.items.data[0].price.id,
						stripeCurrentPeriodEnd: new Date(
							subscription.current_period_end * 1000
						)
					}
				})
			}

			if (event.type === 'invoice.payment_failed') {
				const subscription = await this.stripe.subscriptions.retrieve(
					session.subscription as string
				)
				await this.prisma.subscription.delete({
					where: {
						stripeSubscriptionId: subscription.id
					}
				})
			}

			if (event.type === 'customer.subscription.deleted') {
				const subscription = await this.stripe.subscriptions.retrieve(
					session.subscription as string
				)
				await this.prisma.subscription.delete({
					where: {
						stripeSubscriptionId: subscription.id
					}
				})
			}
		} catch (err) {
			return
		}
	}
}
