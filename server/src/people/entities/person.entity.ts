import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Person extends Model {
  @Column
  name: string;
  @Column
  surname: string;
  @Column
  lastname: string;
  @Column
  phone: string;
  @Column({ type: DataType.TEXT })
  description: string;
}
