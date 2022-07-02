import { Module } from '@nestjs/common';
import { ContactPersonController } from './contact_person.controller';
import { ContactPersonService } from './contact_person.service';

@Module({
  controllers: [ContactPersonController],
  providers: [ContactPersonService]
})
export class ContactPersonModule {}
