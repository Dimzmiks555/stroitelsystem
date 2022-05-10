import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { Document } from 'src/document/entities/document.entity';

@Module({
  imports: [SequelizeModule.forFeature([Order, Contragent, Document])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
