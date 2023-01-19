import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Contragent } from 'src/contragents/entities/contragent.entity';
import { NoteProduct } from 'src/note-products/entities/note-product.entity';
import { ObjectsModel } from 'src/objects/entities/object.entity';
import { Person } from 'src/people/entities/person.entity';
import { Transport } from 'src/transport/entities/transport.entity';

@Table({
  paranoid: true
})
export class Note extends Model {
  @Column({ defaultValue: false })
  isChecked: boolean;

  @Column({ defaultValue: false })
  isReturn: boolean;

  @Column({ defaultValue: false })
  isUpdatedAfterCheck: boolean;

  @Column
  Date: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column
  basis: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  summ: number;

  @ForeignKey(() => Contragent)
  @Column
  seller_id: number;

  @ForeignKey(() => Contragent)
  @Column
  buyer_id: number;

  @ForeignKey(() => Person)
  @Column
  person_id: number;

  @ForeignKey(() => ObjectsModel)
  @Column
  object_id: number;

  @ForeignKey(() => Transport)
  @Column
  transport_id: number;

  @BelongsTo(() => ObjectsModel)
  object: ObjectsModel;

  @BelongsTo(() => Contragent, 'buyer_id')
  buyer: Contragent;

  @BelongsTo(() => Contragent, 'seller_id')
  seller: Contragent;

  @BelongsTo(() => Person, 'person_id')
  person: Person;

  @BelongsTo(() => Transport, 'transport_id')
  transport: Transport;

  @HasMany(() => NoteProduct)
  products: Array<NoteProduct>;
}
