import { Module } from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { ObjectsController } from './objects.controller';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeModule } from '@nestjs/sequelize';
import { ObjectsModel } from './entities/object.entity';

@Module({
  imports: [SequelizeModule.forFeature([ObjectsModel])],
  controllers: [ObjectsController],
  providers: [ObjectsService]
})
export class ObjectsModule {}
