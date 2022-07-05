import { Module } from '@nestjs/common';
import { SimCardController } from './sim_card.controller';
import { SimCardService } from './sim_card.service';
import {PrismaService} from "../core/prisma.service";

@Module({
  controllers: [SimCardController],
  providers: [SimCardService, PrismaService],
  exports: [PrismaService]
})
export class SimCardModule {}
