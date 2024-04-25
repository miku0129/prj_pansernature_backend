import { Controller, Get, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

type GetPublishabeKeyResponse = {
  publishable_key: string;
};
type CreatePaymentIntentResponse = {
  client_secret: string;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get()
  getPublishableKey(): GetPublishabeKeyResponse {
    return { publishable_key: process.env.STRIPE_PUBLISHABLE_KEY! };
  }

  @Post()
  async createPaymentIntent(
    @Body('amount') amount: number | undefined,
  ): Promise<CreatePaymentIntentResponse> {
    if (amount) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'eur',
        payment_method_types: ['card', 'paypal'],
      });

      return { client_secret: paymentIntent.client_secret };
    }
  }
}
