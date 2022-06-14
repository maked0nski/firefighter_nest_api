import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import { UserLoginModule } from './user-login/user-login.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NONE_ENV}.env`
      }),
      UserLoginModule
  ],
  providers: [],
})
export class AppModule {}
