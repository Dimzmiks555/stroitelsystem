import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Event extends Model {

    @Column
    type: string

    @Column
    entity_id: number

    @Column
    entity: string

    @Column({type: DataType.TEXT})
    previousData: string

    @Column({type: DataType.TEXT})
    realData: string


}
