import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Note } from "src/notes/entities/note.entity";


@Table
export class NoteProduct extends Model {

    @Column
    name: string

    @Column
    edizm: string

    @Column({type: DataType.DECIMAL(10,2)})
    amount: number

    @Column({type: DataType.DECIMAL(10,2)})
    price: number

    @Column({type: DataType.DECIMAL(10,2)})
    summ: number

    @ForeignKey(() => Note)
    @Column
    note_id: number

}
