import { Module } from '@nestjs/common';
import { ContragentsService } from './contragents.service';
import { ContragentsController } from './contragents.controller';

@Module({
  controllers: [ContragentsController],
  providers: [ContragentsService]
})
export class ContragentsModule {}
