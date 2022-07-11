import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Note } from './entities/note.entity';
import { NoteProduct } from 'src/note-products/entities/note-product.entity';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Note, NoteProduct]),
    EventModule
  ],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
