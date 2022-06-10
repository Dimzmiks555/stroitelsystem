import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AvanseService } from './avanse.service';
import { CreateAvanseDto } from './dto/create-avanse.dto';
import { UpdateAvanseDto } from './dto/update-avanse.dto';

@Controller('avanse')
export class AvanseController {
  constructor(private readonly avanseService: AvanseService) {}

  @Post()
  create(@Body() createAvanseDto: CreateAvanseDto) {
    return this.avanseService.create(createAvanseDto);
  }

  @Get()
  findAll(@Query() params: any) {
    return this.avanseService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id, @Query() params: any) {
    return this.avanseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateAvanseDto: UpdateAvanseDto) {
    return this.avanseService.update(+id, updateAvanseDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.avanseService.remove(+id);
  }
}
