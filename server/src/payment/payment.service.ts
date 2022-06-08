import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {

  constructor(
    @InjectModel(Payment)
    private paymentModel: typeof Payment
  ){}


  create(createPaymentDto) {
    return this.paymentModel.create(createPaymentDto)
  }

  findAll(query) {
    return this.paymentModel.findAndCountAll({
      where: query,
      include: [
        {'model': Contragent}
      ]
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id, updatePaymentDto) {
    return this.paymentModel.update(updatePaymentDto, {
      where: {id}
    });
  }

  remove(id) {
    return this.paymentModel.destroy({
      where: {id}
    })
  }
}
