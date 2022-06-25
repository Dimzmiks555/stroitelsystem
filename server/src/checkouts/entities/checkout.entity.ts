import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CheckoutsProduct } from "src/checkouts-products/entities/checkouts-product.entity";
import { ObjectsModel } from "src/objects/entities/object.entity";
import { Person } from "src/people/entities/person.entity";

@Table
export class Checkout extends Model {

    
    @Column({defaultValue: false})
    isChecked: boolean

    @Column({defaultValue: false})
    isUpdatedAfterCheck: boolean

    @Column({type: DataType.TEXT})
    description: string

    @Column
    Number: string

    @Column
    Ref_Key: string

    @ForeignKey(() => ObjectsModel)
    @Column
    object_id: number

    
    @ForeignKey(() => Person)
    @Column
    person_id: number

    
    @BelongsTo(() => Person, 'person_id')
    person: Person
    
    @Column
    Date: string
    
    @Column({type: DataType.DECIMAL(10,2)})
    summ: number

    @Column({type: DataType.DECIMAL(10,2)})
    summ_after_discount: number
    
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
