import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CheckoutsProduct } from "src/checkouts-products/entities/checkouts-product.entity";
import { ObjectsModel } from "src/objects/entities/object.entity";

@Table
export class Checkout extends Model {
    @Column({type: DataType.TEXT})
    description: string

    @Column
    Number: string

    @Column
    Ref_Key: string

    @ForeignKey(() => ObjectsModel)
    @Column
    object_id: number
    
    @Column
    Date: string
    
    @Column({type: DataType.FLOAT})
    summ: number
    
    @Column
    buyer: string
    
    @Column
    seller: string
    
    @Column
    sklad: string

    @HasMany(() => CheckoutsProduct)
    products: Array<CheckoutsProduct>

    @BelongsTo(() => ObjectsModel)
    object: ObjectsModel

    
}
