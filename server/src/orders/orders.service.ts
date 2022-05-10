import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { Document } from 'src/document/entities/document.entity';
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

    @InjectModel(Document)
    private documentModel: typeof Document,
  ) {}

  create(createOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  findAll(query) {


    let options: any = {}

    let {status} = query

    if (status == 'new') {
       options.status = {
        [Op.not] : 'Завершен' 
       }
    }


    return this.orderModel.findAll({
      where: options,
      order: [['createdAt', 'DESC']],
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
        {
          model: this.documentModel,
          as: 'files',
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
