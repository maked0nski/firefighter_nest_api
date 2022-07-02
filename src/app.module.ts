import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {APP_GUARD} from "@nestjs/core";

import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {AtGuard} from "./core/guards";
import { FuelCardModule } from './fuel_card/fuel_card.module';
import { PositionModule } from './position/position.module';
import { CarModule } from './car/car.module';
import { SimCardModule } from './sim_card/sim_card.module';
import { ClientModule } from './client/client.module';
import { ContactPersonModule } from './contact_person/contact_person.module';
import { FireExtinguishersModule } from './fire_extinguishers/fire_extinguishers.module';
import { FireHydrantModule } from './fire_hydrant/fire_hydrant.module';
import { FireResistantImpregnationModule } from './fire_resistant_impregnation/fire_resistant_impregnation.module';
import { ObservationModule } from './observation/observation.module';

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
