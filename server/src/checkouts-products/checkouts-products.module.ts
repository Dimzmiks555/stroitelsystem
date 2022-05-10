import { Module } from '@nestjs/common';
import { CheckoutsProductsService } from './checkouts-products.service';
import { CheckoutsProductsController } from './checkouts-products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Checkout } from 'src/checkouts/entities/checkout.entity';
import { CheckoutsProduct } from './entities/checkouts-product.entity';

@Module({
  imports: [SequelizeModule.forFeature([CheckoutsProduct])],
  controllers: [CheckoutsProductsController],
  providers: [CheckoutsProductsService]
})
export class CheckoutsProductsModule {}
