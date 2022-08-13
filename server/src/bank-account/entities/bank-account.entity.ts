import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Contragent } from 'src/contragents/entities/contragent.entity';

@Table
export class BankAccount extends Model {
  @ForeignKey(() => Contragent)
  @Column
  contragent_id: number;

  @Column
  rass_schet: string;

  @Column
  name: string;

  @Column
  bank: string;

  @Column
  bik: string;

  @Column
  korr_schet: string;
}
