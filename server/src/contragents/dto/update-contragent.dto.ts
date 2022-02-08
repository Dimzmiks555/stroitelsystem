import { PartialType } from '@nestjs/mapped-types';
import { CreateContragentDto } from './create-contragent.dto';

export class UpdateContragentDto extends PartialType(CreateContragentDto) {}
