import { Module } from '@nestjs/common';
import { NomenklaturaService } from './nomenklatura.service';
import { NomenklaturaController } from './nomenklatura.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Nomenklatura } from './entities/nomenklatura.entity';

@Module({
  imports: [SequelizeModule.forFeature([Nomenklatura])],
  controllers: [NomenklaturaController],
  providers: [NomenklaturaService],
})
export class NomenklaturaModule {}
