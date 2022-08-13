import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RealisationsService } from './realisations.service';
import { CreateRealisationDto } from './dto/create-realisation.dto';
import { UpdateRealisationDto } from './dto/update-realisation.dto';

@Controller('realisations')
export class RealisationsController {
  constructor(private readonly realisationsService: RealisationsService) {}

  @Post()
  create(@Body() createRealisationDto: CreateRealisationDto) {
    return this.realisationsService.create(createRealisationDto);
  }

  @Get()
  findAll() {
    return this.realisationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realisationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRealisationDto: UpdateRealisationDto,
  ) {
    return this.realisationsService.update(+id, updateRealisationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realisationsService.remove(+id);
  }
}
