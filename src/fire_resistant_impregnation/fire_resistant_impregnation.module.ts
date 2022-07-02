import { Module } from '@nestjs/common';
import { FireResistantImpregnationController } from './fire_resistant_impregnation.controller';
import { FireResistantImpregnationService } from './fire_resistant_impregnation.service';

@Module({
  controllers: [FireResistantImpregnationController],
  providers: [FireResistantImpregnationService]
})
export class FireResistantImpregnationModule {}
