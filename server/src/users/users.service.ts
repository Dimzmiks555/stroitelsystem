import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ){}


  async findOne(username: string){
    return this.userModel.findOne({
      where: {
        username
      }
    });
  }

  async create(username: string, password: string){
    return this.userModel.create({username, password});
  }

}