import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { Debt } from './entities/debt.entity';

@Module({
  imports: [SequelizeModule.forFeature([Debt])],
  controllers: [DebtController],
  providers: [DebtService]
})
export class DebtModule {}
