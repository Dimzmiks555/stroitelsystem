import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Deal } from "src/deals/entities/deal.entity";


@Table
export class Payment extends Model {

    @ForeignKey(() => Deal)
    @Column
    deal_id: number

    @Column
    summ: number
    
    @Column
    description: string

    @Column
    type: string

}
