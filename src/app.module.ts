import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import { UserModule } from './user/user.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NONE_ENV}.env`
      }),
      UserModule,
  ],
  providers: [],
})
export class AppModule {}
