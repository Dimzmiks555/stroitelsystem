import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContragentsService } from './contragents.service';
import { CreateContragentDto } from './dto/create-contragent.dto';
import { UpdateContragentDto } from './dto/update-contragent.dto';

@Controller('contragents')
export class ContragentsController {
  constructor(private readonly contragentsService: ContragentsService) {}

  @Post()
  create(@Body() createContragentDto: CreateContragentDto) {
    return this.contragentsService.create(createContragentDto);
  }

  @Get()
  findAll() {
    return this.contragentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contragentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContragentDto: UpdateContragentDto) {
    return this.contragentsService.update(+id, updateContragentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contragentsService.remove(+id);
  }
}
