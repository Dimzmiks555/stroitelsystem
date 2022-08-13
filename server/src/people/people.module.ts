import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './entities/person.entity';

@Module({
  imports: [SequelizeModule.forFeature([Person])],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
