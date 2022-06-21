import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {AtGuard} from "./core/guards";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.${process.env.NONE_ENV}.env`
      }),
      UserModule,
      AuthModule,
  ],
  providers: [
      {
          provide:APP_GUARD,
          useClass:AtGuard,
      },
  ],
})
export class AppModule {}
