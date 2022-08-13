import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Contragent } from "src/contragents/entities/contragent.entity";

@Table
export class Debt extends Model<Debt> {


    @Column({type: DataType.DECIMAL(10,2)})
    summ: number

    @ForeignKey(() => Contragent)
    @Column
    debtor_id: number

    @ForeignKey(() => Contragent)
    @Column
    creditor_id: number

    @BelongsTo(() => Contragent, 'debtor_id')
    debtor: Contragent;

    @BelongsTo(() => Contragent, 'creditor_id')
    creditor: Contragent;



}
