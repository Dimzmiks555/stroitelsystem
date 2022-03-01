import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Order extends Model {
    @Column
    title: string;

    @Column({type: DataType.TEXT})
    description: string;

    @Column({type: DataType.INTEGER})
    buyer_id: number;

    @Column({type: DataType.INTEGER})
    seller_id: number;

    @Column({type: DataType.STRING, defaultValue: 'new'})
    status: string;

    @Column({type: DataType.STRING})
    payment_method: string;

    @Column({type: DataType.DATE})
    shipping_date: string;

    @Column({type: DataType.FLOAT})
    summ: number;
}
