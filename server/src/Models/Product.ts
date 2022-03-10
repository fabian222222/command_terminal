import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProductHasIngredient } from "./ProductHasIngredient"
import { CommandHasProduct } from "./CommandHasProduct"

@Entity()
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    price:number

    @Column()
    custome:boolean

    @OneToMany(()=>ProductHasIngredient, productHasIngredient=>productHasIngredient.product)
    productHasIngredient:ProductHasIngredient[]

    @OneToMany(()=>CommandHasProduct, commandHasProduct=>commandHasProduct.product)
    commandHasProduct:CommandHasProduct[]
}