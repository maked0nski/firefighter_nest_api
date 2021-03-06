import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import {PrismaService} from "../core/prisma.service";

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService],
  exports: [PrismaService]
})
export class ClientModule {}
