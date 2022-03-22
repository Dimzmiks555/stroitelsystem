import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNomenklaturaDto } from './dto/create-nomenklatura.dto';
import { UpdateNomenklaturaDto } from './dto/update-nomenklatura.dto';
import { Nomenklatura } from './entities/nomenklatura.entity';

@Injectable()
export class NomenklaturaService {

  constructor(
    @InjectModel(Nomenklatura)
    private nomenklaturaModel: typeof Nomenklatura,

  ) {}

  create(createNomenklaturaDto) {
    return this.nomenklaturaModel.create(createNomenklaturaDto)
  }

  findAll() {
    return this.nomenklaturaModel.findAll()
  }

  findOne(id: number) {
    return this.nomenklaturaModel.findOne({
      where: {id}
    })
  }

  update(id: number, updateNomenklaturaDto: any) {
    return this.nomenklaturaModel.update(updateNomenklaturaDto, {
      where: {id}
    });
  }

  remove(id: number) {
    return `This action removes a #${id} nomenklatura`;
  }
}
