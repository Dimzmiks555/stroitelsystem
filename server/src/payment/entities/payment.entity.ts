import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { Deal } from 'src/deals/entities/deal.entity';
import { ObjectsModel } from 'src/objects/entities/object.entity';

@Table
export class Payment extends Model {
  @ForeignKey(() => Contragent)
  @Column
  contragent_id: number;

  @ForeignKey(() => ObjectsModel)
  @Column
  object_id: number;

  @ForeignKey(() => Deal)
  @Column
  deal_id: number;

  @Column({ type: DataType.DECIMAL(10, 2) })
  summ: number;

  @Column
  description: string;

  @Column
  type: string;

  @Column
  payment_method: string;

  @BelongsTo(() => Contragent, 'contragent_id')
  contragent: Contragent;

  @BelongsTo(() => Deal, 'deal_id')
  deal: Deal;
}
