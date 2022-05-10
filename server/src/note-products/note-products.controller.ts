import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoteProductsService } from './note-products.service';
import { CreateNoteProductDto } from './dto/create-note-product.dto';
import { UpdateNoteProductDto } from './dto/update-note-product.dto';

@Controller('note-products')
export class NoteProductsController {
  constructor(private readonly noteProductsService: NoteProductsService) {}

  @Post()
  create(@Body() createNoteProductDto: CreateNoteProductDto) {
    return this.noteProductsService.create(createNoteProductDto);
  }

  @Get()
  findAll() {
    return this.noteProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteProductDto: UpdateNoteProductDto) {
    return this.noteProductsService.update(+id, updateNoteProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteProductsService.remove(+id);
  }
}
