import { PartialType } from '@nestjs/mapped-types';
import { CreateRealisationDto } from './create-realisation.dto';

export class UpdateRealisationDto extends PartialType(CreateRealisationDto) {}
