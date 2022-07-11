import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { EventService } from 'src/event/event.service';
import { NoteProduct } from 'src/note-products/entities/note-product.entity';
import { ObjectsModel } from 'src/objects/entities/object.entity';
import { Person } from 'src/people/entities/person.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {

  constructor(
    @InjectModel(Note)
    private noteModel: typeof Note,

    @InjectModel(NoteProduct)
    private noteProductModel: typeof NoteProduct,

    private eventService: EventService,
    
    

  ){}


  async create(createNoteDto) {
    
    console.log(createNoteDto)

    let note = await this.noteModel.create(createNoteDto)

    let eventData = {
      type: 'CREATE',
      entity_id: note?.id,
      entity: 'note',
      realData: JSON.stringify(createNoteDto)
    }

    let event = await this.eventService.create(eventData)

    createNoteDto?.rows?.forEach(item => {

      this.noteProductModel.create({...item, note_id: note.id})
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })

    })

    return note

  }

  findAll(params: any) {
    return this.noteModel.findAll({
      where: params,
      include: [
        {model: ObjectsModel},
        {model: NoteProduct},
        {model: Person},
        {model: Contragent, as: 'buyer'},
        {model: Contragent, as: 'seller'},
      ],
      order: [['id', 'desc']]
    })
  }

  findOne(id: number, params: any) {

    console.log(params)

    return this.noteModel.findOne({
      where: { id},
      include: [
        {model: ObjectsModel},
        {model: NoteProduct},
        {model: Person},
        {model: Contragent, as: 'buyer'},
        {model: Contragent, as: 'seller'},
      ]
    })
  }

  async update(id: number, updateNoteDto) {

    let prevNote = await this.noteModel.findOne({
      where: {id}
    })

    let note = await this.noteModel.update(updateNoteDto, {
      where: {id}
    })

    let eventData = {
      type: 'UPDATE',
      entity_id: id,
      entity: 'note',
      previousData: JSON.stringify(prevNote),
      realData: JSON.stringify(updateNoteDto)
    }

    let event = this.eventService.create(eventData)

    

    async function updateProduct(item, noteProductModel) {

        // let noteProduct = await noteProductModel.findOne({
        //   where: {id: item?.id}
        // })
  
        console.log(item)
  
        if (item?.id) {
          noteProductModel.update(item, {
            where: {id: item?.id}
          })
          .then(res => {
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
        } else {
          noteProductModel.create({...item, note_id: id})
          .then(res => {
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
        }

    }

    updateNoteDto?.rows?.forEach(item => {
      // console.log(item)
      updateProduct(item, this.noteProductModel)


    })

    return note
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
