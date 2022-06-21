import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckoutsProductsService } from './checkouts-products.service';
import { CreateCheckoutsProductDto } from './dto/create-checkouts-product.dto';
import { UpdateCheckoutsProductDto } from './dto/update-checkouts-product.dto';

@Controller('checkouts-products')
export class CheckoutsProductsController {
  constructor(private readonly checkoutsProductsService: CheckoutsProductsService) {}

  @Post()
  create(@Body() createCheckoutsProductDto: CreateCheckoutsProductDto) {
    return this.checkoutsProductsService.create(createCheckoutsProductDto);
  }

  @Get()
  findAll() {
    return this.checkoutsProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.checkoutsProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateCheckoutsProductDto: UpdateCheckoutsProductDto) {
    return this.checkoutsProductsService.update(+id, updateCheckoutsProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.checkoutsProductsService.remove(+id);
  }
}
