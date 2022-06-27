import { Checkout } from './../checkouts/entities/checkout.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from 'src/notes/entities/note.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ObjectsModel } from 'src/objects/entities/object.entity';
import { Op } from 'sequelize';

@Injectable()
export class ExpenseService {

  constructor(
    @InjectModel(Note)
    private noteModel: typeof Note,

    @InjectModel(Checkout)
    private checkoutModel: typeof Checkout,

    @InjectModel(ObjectsModel)
    private objectModel: typeof ObjectsModel
  ){}


  create(createExpenseDto: CreateExpenseDto) {
    return 'This action adds a new expense';
  }

  async findAll(params) {

    
    let object = await this.objectModel.findOne({
      where: {id: params?.object_id}
    })

    let expenses = []
    let notes_total = 0
    let checkouts_total = 0
    let total = 0
    let start_balance = object?.initial_balance
    let end_balance = 0


    let dateFrom = params?.dateFrom || object?.initial_balance_date || ('2000-01-01')

    let before_notes = await this.noteModel.findAll({
      where: {
        object_id: params?.object_id,
        date: {
          [Op.lte]: new Date(dateFrom)
        }
      }
    })

    let before_checkouts = await this.checkoutModel.findAll({
      where: {
        object_id: params?.object_id,
        date: {
          [Op.lte]: new Date(dateFrom)
        }
      }
    })

    let notes = await this.noteModel.findAll({
      where: {
        object_id: params?.object_id,
        date: {
          [Op.gte]: new Date(dateFrom)
        }
      }
    }).then(res => {

      res = JSON.parse(JSON.stringify(res))
      res.forEach((component: any) => {component.type = 'note'});
      return res

    }) 
    let checkouts = await this.checkoutModel.findAll({
      where: {
        object_id: params?.object_id,
        date: {
          [Op.gte]: new Date(dateFrom)
        }
      }
    }).then(res => {

      res = JSON.parse(JSON.stringify(res))
      res.forEach((component: any) => {component.type = 'checkout'});
      return res
      
    }) 

    let before_notes_total = before_notes.reduce((now, prev) => {return now + +prev?.summ}, 0)
    let before_checkouts_total = before_checkouts.reduce((now, prev) => {return now + +prev?.summ_after_discount}, 0)
    let before_total = before_notes_total + before_checkouts_total


    notes_total = notes.reduce((now, prev) => {return now + +prev?.summ}, 0)
    checkouts_total = checkouts.reduce((now, prev) => {return now + +prev?.summ_after_discount}, 0)
    total = notes_total + checkouts_total

    expenses = [...notes, ...checkouts]

  
    if (object.initial_balance) {
      end_balance = +object.initial_balance - total
    } else {
      end_balance = 0 - total
    }


    return {
      expenses, notes_total, checkouts_total, total, dateFrom, start_balance, end_balance, before_checkouts_total, object
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
