import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";

import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {AtGuard} from "./_core/guards";
import { FuelCardModule } from './fuel_card/fuel_card.module';
import { PositionModule } from './position/position.module';
import { CarModule } from './car/car.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NONE_ENV}.env`
        }),
        UserModule,
        AuthModule,
        FuelCardModule,
        PositionModule,
        CarModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
    ],
})
export class AppModule {
}
