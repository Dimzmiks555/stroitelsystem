import { PartialType } from '@nestjs/mapped-types';
import { CreateNomenklaturaDto } from './create-nomenklatura.dto';

export class UpdateNomenklaturaDto extends PartialType(CreateNomenklaturaDto) {}
