import { Module } from '@nestjs/common';
import { FireExtinguishersController } from './fire_extinguishers.controller';
import { FireExtinguishersService } from './fire_extinguishers.service';

@Module({
  controllers: [FireExtinguishersController],
  providers: [FireExtinguishersService]
})
export class FireExtinguishersModule {}
