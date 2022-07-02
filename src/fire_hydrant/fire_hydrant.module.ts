import { Module } from '@nestjs/common';
import { FireHydrantController } from './fire_hydrant.controller';
import { FireHydrantService } from './fire_hydrant.service';

@Module({
  controllers: [FireHydrantController],
  providers: [FireHydrantService]
})
export class FireHydrantModule {}
