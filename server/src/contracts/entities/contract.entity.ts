import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { Document } from 'src/document/entities/document.entity';

@Table
export class Contract extends Model {
  @Column
  contract_number: string;

  @Column
  date: string;

  @ForeignKey(() => Contragent)
  @Column
  seller_id: number;

  @ForeignKey(() => Contragent)
  @Column
  buyer_id: number;

  @Column
  description: string;

  @BelongsTo(() => Contragent, 'seller_id')
  seller: Contragent;

  @BelongsTo(() => Contragent, 'buyer_id')
  buyer: Contragent;

  @HasMany(() => Document)
  files: Array<Document>;
}
