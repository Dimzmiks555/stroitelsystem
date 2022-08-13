import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { Document } from 'src/document/entities/document.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectModel(Contract)
    private contractModel: typeof Contract,
  ) {}

  create(createContractDto: any) {
    return this.contractModel.create(createContractDto);
  }

  findAll() {
    return this.contractModel.findAll({
      include: [
        { model: Contragent, as: 'buyer' },
        { model: Contragent, as: 'seller' },
        { model: Document },
      ],
    });
  }

  findOne(id) {
    return this.contractModel.findOne({
      where: { id },
      include: [
        { model: Contragent, as: 'buyer' },
        { model: Contragent, as: 'seller' },
        { model: Document },
      ],
    });
  }

  update(id, updateContractDto: any) {
    return this.contractModel.update(updateContractDto, {
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
