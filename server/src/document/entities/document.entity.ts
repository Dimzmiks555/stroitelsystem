import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Contract } from "src/contracts/entities/contract.entity";
import { Deal } from "src/deals/entities/deal.entity";
import { Order } from "src/orders/entities/order.entity";

@Table
export class Document extends Model {
    
    @Column
    name: string

    @ForeignKey(() => Order)
    @Column
    order_id: number

    @ForeignKey(() => Contract)
    @Column
    contract_id: number

    @ForeignKey(() => Deal)
    @Column
    start_deal_id: number

    @ForeignKey(() => Deal)
    @Column
    end_deal_id: number
}
