import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Transport extends Model<Transport> {
  @Column
  name: string;
}
