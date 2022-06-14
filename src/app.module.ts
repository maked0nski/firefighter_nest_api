import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NONE_ENV}.env`
      }),
      UserModule,
      ProfileModule,

  ],
  providers: [],
})
export class AppModule {}
