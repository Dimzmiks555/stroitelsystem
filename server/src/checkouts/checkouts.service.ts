import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CheckoutsProductsService } from 'src/checkouts-products/checkouts-products.service';
import { CheckoutsProduct } from 'src/checkouts-products/entities/checkouts-product.entity';
import { ObjectsModel } from 'src/objects/entities/object.entity';
import { RealisationsService } from 'src/realisations/realisations.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { Checkout } from './entities/checkout.entity';

@Injectable()
export class CheckoutsService {

  constructor(
    private realisationsService: RealisationsService,

    @InjectModel(Checkout)
    private checkoutModel: typeof Checkout,
    
    @InjectModel(CheckoutsProduct)
    private checkoutProductModel: typeof CheckoutsProduct

    ) {}

  async create(createCheckoutDto) {
    console.log(createCheckoutDto)

    const realisation = await this.realisationsService.findOne(createCheckoutDto?.['Ref_Key'])

    const checkout = await this.checkoutModel.create(createCheckoutDto)
    

    realisation?.['Товары']?.forEach(item => {
      let product = {
        name: item?.['Номенклатура']?.['НаименованиеПолное'],
        sku: item?.['Номенклатура']?.['Артикул'],
        price: item['Цена'],
        amount: item['Количество'],
        summ: item['Сумма'],
        checkout_id: +checkout?.id,
      }

      this.checkoutProductModel.create(product)

    })

    return checkout


  }

  findAll() {
    return this.checkoutModel.findAll({
      include: [
        {model: ObjectsModel}
      ]
    })
  }

  findOne(id: number) {
    return this.checkoutModel.findOne({
      where: {id},
      include: [
        {model: CheckoutsProduct},
        {model: ObjectsModel}
      ]
    })
  }

  update(id: number, updateCheckoutDto: UpdateCheckoutDto) {
    return `This action updates a #${id} checkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkout`;
  }
}
