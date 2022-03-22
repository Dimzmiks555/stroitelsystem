import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";

@Table
export class ObjectsModel extends Model {
    @Column({type: DataType.STRING})
    name: string;

    @Column({type: DataType.TEXT})
    description: string;
    

}
