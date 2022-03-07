import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,

    @InjectModel(Contragent)
    private contragentModel: typeof Contragent,
  ) {}

  create(createOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  findAll() {
    return this.orderModel.findAll({
      include: [
        {
          model: this.contragentModel,
          as: 'buyer'
        },
        {
          model: this.contragentModel,
          as: 'seller',
        },
      ],
    });
  }

  findOne(id: number) {
    return this.orderModel.findOne({
      include: [
        {
          model: this.contragentModel,
          as: 'buyer'
        },
        {
          model: this.contragentModel,
          as: 'seller',
        },
      ],
      where: {id}
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.update(updateOrderDto, {
      where: {id}
    });
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
