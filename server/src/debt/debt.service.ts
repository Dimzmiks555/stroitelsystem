import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { Debt } from './entities/debt.entity';

@Injectable()
export class DebtService {

  constructor(
    @InjectModel(Debt)
    private debtModel: typeof Debt


  ){}


  async create(createDebtDto: CreateDebtDto) {
    const debt = this.debtModel.create(createDebtDto)
    return debt
  }

  findAll() {
    return this.debtModel.findAll({
      include: [
        { model: Contragent, as: 'creditor' },
        { model: Contragent, as: 'debtor' },
      ],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} debt`;
  }

  update(id: number, updateDebtDto: UpdateDebtDto) {
    return this.debtModel.update(updateDebtDto, {
      where: {id}
    });
  }

  remove(id: number) {
    return this.debtModel.destroy({
      where: {id}
    });
  }
}
