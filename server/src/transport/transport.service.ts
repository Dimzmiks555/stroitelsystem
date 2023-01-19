import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { Transport } from './entities/transport.entity';

@Injectable()
export class TransportService {

  constructor(
    @InjectModel(Transport)
    private transportModel: typeof Transport
  ){}

  create(createTransportDto: CreateTransportDto) {
    return this.transportModel.create(createTransportDto);
  }

  findAll() {
    return this.transportModel.findAll();
  }

  findOne(id: number) {
    return this.transportModel.findOne({
      where: {id}
    });
  }

  update(id: number, updateTransportDto: UpdateTransportDto) {
    return this.transportModel.update(updateTransportDto, {
      where: {id}
    });
  }

  remove(id: number) {
    return this.transportModel.destroy({
      where: {id}
    });
  }
}
