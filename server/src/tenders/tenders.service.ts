import { Injectable } from '@nestjs/common';
import { CreateTenderDto } from './dto/create-tender.dto';
import { UpdateTenderDto } from './dto/update-tender.dto';

@Injectable()
export class TendersService {
  create(createTenderDto: CreateTenderDto) {
    return 'This action adds a new tender';
  }

  findAll() {
    return `This action returns all tenders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tender`;
  }

  update(id: number, updateTenderDto: UpdateTenderDto) {
    return `This action updates a #${id} tender`;
  }

  remove(id: number) {
    return `This action removes a #${id} tender`;
  }
}
