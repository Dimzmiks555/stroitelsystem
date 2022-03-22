import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { ObjectsModel } from './entities/object.entity';

@Injectable()
export class ObjectsService {

  constructor(
    @InjectModel(ObjectsModel)
    private objectsModel: typeof ObjectsModel,

  ) {}

  create(createObjectDto: any) {
    return this.objectsModel.create(createObjectDto)
  }

  findAll() {
    return this.objectsModel.findAll()
  }

  findOne(id: number) {
    return this.objectsModel.findOne({
      where: {id}
    })
  }

  update(id: number, updateObjectDto: any) {
    return this.objectsModel.update(updateObjectDto, {
      where: {id}
    });
  }

  remove(id: number) {
    return `This action removes a #${id} object`;
  }
}
