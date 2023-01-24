import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { Note } from 'src/notes/entities/note.entity';
import { CreateNoteProductDto } from './dto/create-note-product.dto';
import { UpdateNoteProductDto } from './dto/update-note-product.dto';
import { NoteProduct } from './entities/note-product.entity';

@Injectable()
export class NoteProductsService {
  constructor(
    @InjectModel(NoteProduct)
    private noteProduct: typeof NoteProduct,
  ) {}

  create(createNoteProductDto: CreateNoteProductDto) {
    return 'This action adds a new noteProduct';
  }

  findAll() {
    return this.noteProduct.findAll();
  }
  
  stats(body) {

    const orderFunctions = {
      count: sequelize.fn('count', sequelize.col('name')),
      summ: sequelize.fn('sum', sequelize.col('NoteProduct.summ')),
      amount: sequelize.fn('sum', sequelize.col('amount'))
    }

    let filterOptions: any = {}
    let noteOptions: any = {}

    let {order, search, startDate, endDate, seller_id} = body

    if (!order) {order = 'summ'}
    if (search) {filterOptions.name = {
      [Op.substring]: search
    }}

    if (seller_id && seller_id != 'null') {noteOptions.seller_id = seller_id}


    function isValidDate(dateObject){
      return new Date(dateObject).toString() !== 'Invalid Date';
  }

    if (isValidDate(new Date(startDate)) && isValidDate(new Date(endDate))) {
      filterOptions.createdAt = {
        [Op.lt]: new Date(endDate),
        [Op.gt]: new Date(startDate)
      }
    }

    return this.noteProduct.findAll({
      attributes: [
        'name',
        'edizm',
        [orderFunctions.count, 'total_count'],
        [orderFunctions.amount, 'total_amount'],
        [orderFunctions.summ, 'total_summ'],
      ],
      group: 'name',
      include: [
        {model: Note, where: noteOptions}
      ],
      order: [[orderFunctions[order], 'DESC']],
      where: filterOptions
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} noteProduct`;
  }

  update(id: number, updateNoteProductDto: UpdateNoteProductDto) {
    return `This action updates a #${id} noteProduct`;
  }

  remove(id: number) {
    return this.noteProduct.destroy({
      where: { id },
    });
  }
}
