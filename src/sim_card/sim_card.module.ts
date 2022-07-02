import { Module } from '@nestjs/common';
import { SimCardController } from './sim_card.controller';
import { SimCardService } from './sim_card.service';

@Module({
  controllers: [SimCardController],
  providers: [SimCardService]
})
export class SimCardModule {}
