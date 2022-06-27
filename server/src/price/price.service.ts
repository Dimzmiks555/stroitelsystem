import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './entities/price.entity';

@Injectable()
export class PriceService {

  constructor(
    @InjectModel(Price)
    private priceModel: typeof Price
  ){}

  create(createPriceDto) {
    return this.priceModel.create(createPriceDto);
  }

  findAll() {
    return this.priceModel.findAll();
  }

  findOne(id) {
    return `This action returns a #${id} price`;
  }

  update(id, updatePriceDto) {
    return this.priceModel.update(updatePriceDto, {
      where: {id}
    });
  }

  remove(id) {
    return `This action removes a #${id} price`;
  }
}
