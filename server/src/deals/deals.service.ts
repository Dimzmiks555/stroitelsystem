import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contract } from 'src/contracts/entities/contract.entity';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { Document } from 'src/document/entities/document.entity';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Deal } from './entities/deal.entity';

@Injectable()
export class DealsService {

  constructor(
    @InjectModel(Deal)
    private dealModel: typeof Deal
  ){}

  create(createDealDto: any) {
    return this.dealModel.create(createDealDto);
  }

  findAll() {
    return this.dealModel.findAll({
      include: [
        {model: Contract},
        {model: Contragent, as: 'buyer'},
        {model: Contragent, as: 'seller'},
        // {model: Document, as: 'end_files'}
      ]
    });
  }

  findOne(id) {
    return this.dealModel.findOne({
      where: {id},
      include: [
        {model: Contract},
        {model: Contragent, as: 'buyer'},
        {model: Contragent, as: 'seller'},
        {model: Document, as: 'end_files'},
        {model: Document, as: 'start_files'}
      ]
    });
  }

  update(id, updateDealDto: any) {
    return this.dealModel.update(updateDealDto, {
      where: {id}
    });
  }

  remove(id) {
    return `This action removes a #${id} deal`;
  }
}
