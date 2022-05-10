import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckoutsProductDto } from './create-checkouts-product.dto';

export class UpdateCheckoutsProductDto extends PartialType(CreateCheckoutsProductDto) {}
