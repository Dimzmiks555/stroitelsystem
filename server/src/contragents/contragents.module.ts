import { Module } from '@nestjs/common';
import { ContragentsService } from './contragents.service';
import { ContragentsController } from './contragents.controller';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contragent } from './entities/contragent.entity';

@Module({
  controllers: [ContragentsController],
  providers: [ContragentsService],
  imports: [SequelizeModule.forFeature([Contragent])],
})
export class ContragentsModule {}
