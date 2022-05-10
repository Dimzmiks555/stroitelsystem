import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNoteProductDto } from './dto/create-note-product.dto';
import { UpdateNoteProductDto } from './dto/update-note-product.dto';
import { NoteProduct } from './entities/note-product.entity';

@Injectable()
export class NoteProductsService {

  constructor(
    @InjectModel(NoteProduct)
    private noteProduct: typeof NoteProduct
  ){}


  create(createNoteProductDto: CreateNoteProductDto) {
    return 'This action adds a new noteProduct';
  }

  findAll() {
    return this.noteProduct.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} noteProduct`;
  }

  update(id: number, updateNoteProductDto: UpdateNoteProductDto) {
    return `This action updates a #${id} noteProduct`;
  }

  remove(id: number) {
    return this.noteProduct.destroy({
      where: {id}
    })
  }
}
