import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {

  constructor(
    @InjectModel(Person)
    private personModel: typeof Person
  ){}

  create(createPersonDto) {
    return this.personModel.create(createPersonDto);
  }

  findAll() {
    return this.personModel.findAll();
  }

  findOne(id: number) {
    return this.personModel.findOne({
      where: {id}
    });
  }

  update(id: number, updatePersonDto) {
    return this.personModel.update(updatePersonDto, {
      where: {id}
    });
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
