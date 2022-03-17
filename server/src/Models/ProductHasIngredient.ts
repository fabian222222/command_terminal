import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Ingredient } from "./Ingredient"
import { Product } from "./Product"

@Entity()
export class ProductHasIngredient extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Product, product => product.productHasIngredient, {
        onDelete:"CASCADE"
    })
    product:Product

    @ManyToOne(()=>Ingredient, ingredient=>ingredient.productHasIngredient, {
        onDelete : "SET NULL"
    })
    ingredient:Ingredient
}