import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Contract } from "src/contracts/entities/contract.entity";
import { Contragent } from "src/contragents/entities/contragent.entity";
import { Document } from "src/document/entities/document.entity";

@Table
export class Deal extends Model {

    @Column
    deal_number: string

    @Column
    date: string

    @ForeignKey(() => Contract)
    @Column
    contract_id: number

    @ForeignKey(() => Contragent)
    @Column
    seller_id: number

    @ForeignKey(() => Contragent)
    @Column
    buyer_id: number

    @Column
    name: string

    @Column
    description: string

    @Column
    warranty: string

    @Column
    start_date: string

    @Column
    end_date: string

    @Column
    specification_number: string

    @Column
    specification_date: string

    @Column
    tender_date: string

    @Column({type: DataType.DECIMAL(10,2)})
    start_summ: number

    @Column({type: DataType.DECIMAL(10,2)})
    end_summ: number

    @BelongsTo(() => Contragent, 'seller_id')
    seller: typeof Contragent

    @BelongsTo(() => Contragent, 'buyer_id')
    buyer: typeof Contragent

    @BelongsTo(() => Contract, 'contract_id')
    contract: typeof Contract

    @HasMany(() => Document, 'start_deal_id')
    start_files: Array<Document>

    @HasMany(() => Document, 'end_deal_id')
    end_files: Array<Document>



}
