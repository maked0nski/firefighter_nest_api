import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";
import {MulterModule} from "@nestjs/platform-express";

import {FireResistantImpregnationModule} from './fire_resistant_impregnation/fire_resistant_impregnation.module';
import {FireExtinguishersModule} from './fire_extinguishers/fire_extinguishers.module';
import {ContactPersonModule} from './contact_person/contact_person.module';
import {FireHydrantModule} from './fire_hydrant/fire_hydrant.module';
import {ObservationModule} from './observation/observation.module';
import {FuelCardModule} from './fuel_card/fuel_card.module';
import {PositionModule} from './position/position.module';
import {SimCardModule} from './sim_card/sim_card.module';
import {ClientModule} from './client/client.module';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {CarModule} from './car/car.module';
import {AtGuard} from "./core/guards";


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
        SimCardModule,
        ClientModule,
        ContactPersonModule,
        FireExtinguishersModule,
        FireHydrantModule,
        FireResistantImpregnationModule,
        ObservationModule,
        MulterModule.register({
            dest: './files',
        })
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
