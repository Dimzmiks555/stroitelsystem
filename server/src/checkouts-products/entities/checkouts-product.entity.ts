import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Checkout } from "src/checkouts/entities/checkout.entity";

@Table
export class CheckoutsProduct extends Model {
    @Column({type: DataType.TEXT})
    name: string

    @Column
    sku: string

    @ForeignKey(() => Checkout)
    @Column
    checkout_id: number

    @Column({type: DataType.DECIMAL(10,2)})
    price: number
    
    @Column({type: DataType.DECIMAL(10,4)})
    amount: number
    
    @Column({type: DataType.DECIMAL(10,2)})
    summ: number


}
