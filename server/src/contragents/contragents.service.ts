import { Injectable } from '@nestjs/common';
import { CreateContragentDto } from './dto/create-contragent.dto';
import { UpdateContragentDto } from './dto/update-contragent.dto';

@Injectable()
export class ContragentsService {
  create(createContragentDto: CreateContragentDto) {
    return 'This action adds a new contragent';
  }

  findAll() {
    return `This action returns all contragents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contragent`;
  }

  update(id: number, updateContragentDto: UpdateContragentDto) {
    return `This action updates a #${id} contragent`;
  }

  remove(id: number) {
    return `This action removes a #${id} contragent`;
  }
}
