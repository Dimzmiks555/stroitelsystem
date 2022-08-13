import { Module } from '@nestjs/common';
import { NoteProductsService } from './note-products.service';
import { NoteProductsController } from './note-products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NoteProduct } from './entities/note-product.entity';

@Module({
  imports: [SequelizeModule.forFeature([NoteProduct])],
  controllers: [NoteProductsController],
  providers: [NoteProductsService],
})
export class NoteProductsModule {}
