import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { CreateAvanseDto } from './dto/create-avanse.dto';
import { UpdateAvanseDto } from './dto/update-avanse.dto';
import { Avanse } from './entities/avanse.entity';

@Injectable()
export class AvanseService {


  constructor(
    @InjectModel(Avanse)
    private avanseModel: typeof Avanse,


  ){}


  async create(createAvanseDto) {
    let avanse = await this.avanseModel.create(createAvanseDto)

    return avanse;
  }

  async findAll(params: any) {
    return this.avanseModel.findAll({
      where: params,
      include: [
        {model: Contragent}
      ]
    });
  }

  async findOne(id: number) {
    return this.avanseModel.findOne({
      where: {id},
      include: [
        {model: Contragent}
      ]
    });
  }

  async update(id: number, updateAvanseDto) {
    return this.avanseModel.update(updateAvanseDto , {
      where: {id},
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} avanse`;
  }
}
