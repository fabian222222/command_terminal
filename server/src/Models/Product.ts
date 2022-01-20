import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Command } from "./Command"
import { ProductHasIngredient } from "./ProductHasIngredient"

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
}