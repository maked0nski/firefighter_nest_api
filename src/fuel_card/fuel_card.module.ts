import { Module } from '@nestjs/common';
import { FuelCardService } from './fuel_card.service';
import { FuelCardController } from './fuel_card.controller';

@Module({
  providers: [FuelCardService],
  controllers: [FuelCardController]
})
export class FuelCardModule {}
