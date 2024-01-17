import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { MembershipsModule } from './memberships/memberships.module';
import { PurchasesModule } from './purchases/purchases.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [ItemsModule, UsersModule, MembershipsModule, PurchasesModule, StripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
