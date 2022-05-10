import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Contragent } from "src/contragents/entities/contragent.entity";
import { NoteProduct } from "src/note-products/entities/note-product.entity";
import { ObjectsModel } from "src/objects/entities/object.entity";

@Table
export class Note extends Model {
    @Column
    Date: string

    @Column({type: DataType.TEXT})
    description: string

    @Column
    basis: string

    @Column({type: DataType.DECIMAL(10,2)})
    summ: number

    @ForeignKey(() => Contragent)
    @Column
    seller_id: number

    @ForeignKey(() => Contragent)
    @Column
    buyer_id: number

    @ForeignKey(() => ObjectsModel)
    @Column
    object_id: number

    @BelongsTo(() => ObjectsModel)
    object: ObjectsModel

    @BelongsTo(() => Contragent, 'buyer_id')
    buyer: Contragent
    
    @BelongsTo(() => Contragent, 'seller_id')
    seller: Contragent

    @HasMany(() => NoteProduct)
    products: Array<NoteProduct>;

}
