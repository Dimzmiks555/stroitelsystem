import { Module } from '@nestjs/common';
import { AvanseService } from './avanse.service';
import { AvanseController } from './avanse.controller';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeModule } from '@nestjs/sequelize';
import { Avanse } from './entities/avanse.entity';

@Module({
  imports: [SequelizeModule.forFeature([Avanse])],
  controllers: [AvanseController],
  providers: [AvanseService]
})
export class AvanseModule {}
