import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteProductDto } from './create-note-product.dto';

export class UpdateNoteProductDto extends PartialType(CreateNoteProductDto) {}
