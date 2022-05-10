import { Module } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';
import { CheckoutsController } from './checkouts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Checkout } from './entities/checkout.entity';
import { RealisationsModule } from 'src/realisations/realisations.module';
import { CheckoutsProductsModule } from 'src/checkouts-products/checkouts-products.module';
import { CheckoutsProduct } from 'src/checkouts-products/entities/checkouts-product.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Checkout, CheckoutsProduct]), 
    RealisationsModule
  ],
  controllers: [CheckoutsController],
  providers: [CheckoutsService]
})
export class CheckoutsModule {}
