import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { Document } from 'src/document/entities/document.entity';

@Table
export class Order extends Model {
  @Column
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @ForeignKey(() => Contragent)
  @Column({ type: DataType.INTEGER })
  buyer_id: number;

  @ForeignKey(() => Contragent)
  @Column({ type: DataType.INTEGER })
  seller_id: number;

  @Column({ type: DataType.STRING, defaultValue: 'new' })
  status: string;

  @Column({ type: DataType.STRING })
  payment_method: string;

  @Column({ type: DataType.DATE })
  date: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  summ: number;

  @BelongsTo(() => Contragent, 'buyer_id')
  buyer: Contragent;

  @BelongsTo(() => Contragent, 'seller_id')
  seller: Contragent;

  @HasMany(() => Document)
  files: Array<Document>;
}
