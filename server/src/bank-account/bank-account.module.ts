import { Module } from '@nestjs/common';
import { BankAccountService } from './bank-account.service';
import { BankAccountController } from './bank-account.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BankAccount } from './entities/bank-account.entity';

@Module({
  imports: [SequelizeModule.forFeature([BankAccount])],
  controllers: [BankAccountController],
  providers: [BankAccountService]
})
export class BankAccountModule {}
