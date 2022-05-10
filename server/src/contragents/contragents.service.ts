import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateContragentDto } from './dto/create-contragent.dto';
import { UpdateContragentDto } from './dto/update-contragent.dto';
import { Contragent } from './entities/contragent.entity';

@Injectable()
export class ContragentsService {

  constructor(
    @InjectModel(Contragent)
    private contragentModel: typeof Contragent
  ){}

  create(createContragentDto) {
    return this.contragentModel.create(createContragentDto)
  }

  findAll() {
    return this.contragentModel.findAll()
  }

  findOne(id: string) {
    return this.contragentModel.findOne({
      where: {id}
    });
  }

  update(id: number, updateContragentDto) {
    return `This action updates a #${id} contragent`;
  }

  remove(id: number) {
    return `This action removes a #${id} contragent`;
  }
}
