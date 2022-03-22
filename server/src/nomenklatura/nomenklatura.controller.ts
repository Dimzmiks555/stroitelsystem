import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NomenklaturaService } from './nomenklatura.service';
import { CreateNomenklaturaDto } from './dto/create-nomenklatura.dto';
import { UpdateNomenklaturaDto } from './dto/update-nomenklatura.dto';

@Controller('nomenklatura')
export class NomenklaturaController {
  constructor(private readonly nomenklaturaService: NomenklaturaService) {}

  @Post()
  create(@Body() createNomenklaturaDto: any) {
    return this.nomenklaturaService.create(createNomenklaturaDto);
  }

  @Get()
  findAll() {
    return this.nomenklaturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nomenklaturaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNomenklaturaDto: UpdateNomenklaturaDto) {
    return this.nomenklaturaService.update(+id, updateNomenklaturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomenklaturaService.remove(+id);
  }
}
