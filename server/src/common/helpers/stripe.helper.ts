import StripePrimary from 'stripe'
import { Injectable } from "@nestjs/common";


export type TypeStripe = StripePrimary

@Injectable()
export class Stripe {
    private static instance: StripePrimary

    public static getInstance(): StripePrimary {
        if (this.instance) {
            return this.instance
        }
        this.instance = new StripePrimary(process.env.STRIPE_API_KEY, {
            apiVersion: '2023-10-16',
            typescript: true
        })
        return this.instance
    }
}