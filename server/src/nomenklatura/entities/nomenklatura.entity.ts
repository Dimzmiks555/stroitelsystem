import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Contragent } from "src/contragents/entities/contragent.entity";

@Table
export class Nomenklatura extends Model {
    @Column
    name: string;

    @Column({type: DataType.TEXT})
    description: string;
    
    @Column({type: DataType.STRING})
    edizm: string;

}
