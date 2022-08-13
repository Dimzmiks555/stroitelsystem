import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Deal } from './entities/deal.entity';

@Module({
  imports: [SequelizeModule.forFeature([Deal])],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
