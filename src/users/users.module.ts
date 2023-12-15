import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from '../config/typeorm';
import { User } from './entities/user.entity';
import { Membership } from './entities/membership.entity';
import { Purchase } from './entities/purchase.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    TypeOrmModule.forFeature([User, Membership, Purchase]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
