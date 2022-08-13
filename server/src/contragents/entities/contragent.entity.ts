import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

@Table
export class Contragent extends Model {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.STRING })
  opf: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.STRING })
  inn: string;

  @Column({ type: DataType.STRING })
  kpp: string;

  @Column({ type: DataType.STRING })
  ogrn: string;

  @Column({ type: DataType.STRING })
  okato: string;

  @Column({ type: DataType.STRING })
  okpo: string;

  @Column({ type: DataType.STRING })
  oktmo: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  manager: string;
}
