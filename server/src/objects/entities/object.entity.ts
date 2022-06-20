import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Checkout } from "src/checkouts/entities/checkout.entity";
import { Note } from "src/notes/entities/note.entity";

@Table
export class ObjectsModel extends Model {
    @Column({type: DataType.STRING})
    name: string;

    @Column({type: DataType.TEXT})
    description: string;

    @Column({type: DataType.TEXT})
    type: string;

    @Column({type: DataType.TEXT})
    status: string;

    @HasMany(() => Checkout)
    checkouts: Array<Checkout>;

    @HasMany(() => Note)
    notes: Array<Note>;

}
