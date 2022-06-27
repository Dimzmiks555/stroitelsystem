import { Note } from './../notes/entities/note.entity';
import { Checkout } from './../checkouts/entities/checkout.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { ObjectsModel } from 'src/objects/entities/object.entity';

@Module({
  imports: [SequelizeModule.forFeature([Note, Checkout, ObjectsModel])],
  controllers: [ExpenseController],
  providers: [ExpenseService]
})
export class ExpenseModule {}
