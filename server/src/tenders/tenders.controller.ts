import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TendersService } from './tenders.service';
import { CreateTenderDto } from './dto/create-tender.dto';
import { UpdateTenderDto } from './dto/update-tender.dto';

@Controller('tenders')
export class TendersController {
  constructor(private readonly tendersService: TendersService) {}

  @Post()
  create(@Body() createTenderDto: CreateTenderDto) {
    return this.tendersService.create(createTenderDto);
  }

  @Get()
  findAll() {
    return this.tendersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tendersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenderDto: UpdateTenderDto) {
    return this.tendersService.update(+id, updateTenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tendersService.remove(+id);
  }
}
