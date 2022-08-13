import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Price extends Model {
  @Column
  name: string;

  @Column
  price: number;

  @Column
  unit: string;

  @Column
  type: string;
}
