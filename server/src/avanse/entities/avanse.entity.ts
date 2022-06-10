import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Contragent } from "src/contragents/entities/contragent.entity";

@Table
export class Avanse extends Model {

    @Column
    summ: string

    @Column
    description: string

    @Column
    Date: string

    @ForeignKey(() => Contragent)
    @Column
    contragent_id: number
    
    @BelongsTo(() => Contragent, 'contragent_id')
    contragent: Contragent

}
