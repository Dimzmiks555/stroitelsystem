import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCheckoutsProductDto } from './dto/create-checkouts-product.dto';
import { UpdateCheckoutsProductDto } from './dto/update-checkouts-product.dto';
import { CheckoutsProduct } from './entities/checkouts-product.entity';

@Injectable()
export class CheckoutsProductsService {

  constructor(
    @InjectModel(CheckoutsProduct)
    private checkoutsProduct: typeof CheckoutsProduct
  ){}

  create(createCheckoutsProductDto) {
    return this.checkoutsProduct.create(createCheckoutsProductDto);
  }

  findAll() {
    return `This action returns all checkoutsProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkoutsProduct`;
  }

  update(id: number, updateCheckoutsProductDto: UpdateCheckoutsProductDto) {
    return `This action updates a #${id} checkoutsProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkoutsProduct`;
  }
}
