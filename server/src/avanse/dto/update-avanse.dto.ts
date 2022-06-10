import { PartialType } from '@nestjs/mapped-types';
import { CreateAvanseDto } from './create-avanse.dto';

export class UpdateAvanseDto extends PartialType(CreateAvanseDto) {}
