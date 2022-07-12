import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { Deal } from 'src/deals/entities/deal.entity';
import { EventService } from 'src/event/event.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {

  constructor(
    @InjectModel(Payment)
    private paymentModel: typeof Payment,

    private eventService: EventService
  ){}


  async create(createPaymentDto) {


    console.log(createPaymentDto)

    let payment = await this.paymentModel.create(createPaymentDto)

    let eventData = {
      type: 'CREATE',
      entity_id: payment.id,
      entity: 'payment',
      // previousData: JSON.stringify(prevNote),
      realData: JSON.stringify(createPaymentDto)
    }

    let event = this.eventService.create(eventData)

    return payment
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
    return this.paymentModel.findOne({
      where: {id},
      include: [
        {'model': Contragent},
        {'model': Deal}
      ]
    });
  }

  async update(id, updatePaymentDto) {


    let payment = await this.paymentModel.findOne({
      where: {id}
    })

    let eventData = {
      type: 'UPDATE',
      entity_id: id,
      entity: 'payment',
      previousData: JSON.stringify(payment),
      realData: JSON.stringify(updatePaymentDto)
    }

    let event = this.eventService.create(eventData)


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
