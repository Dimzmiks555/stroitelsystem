import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contract } from './entities/contract.entity';

@Module({
  imports: [SequelizeModule.forFeature([Contract])],
  controllers: [ContractsController],
  providers: [ContractsService]
})
export class ContractsModule {}
