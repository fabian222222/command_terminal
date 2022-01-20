import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { ProductHasIngredient } from "./ProductHasIngredient"

@Entity()
export class Ingredient extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    price:number
    
    @Column()
    quantity:number

    @OneToMany(()=>ProductHasIngredient, productHasIngredient=>productHasIngredient.ingredient)
    productHasIngredient:ProductHasIngredient[]

}