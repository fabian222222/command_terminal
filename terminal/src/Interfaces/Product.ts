import { Ingredient } from "./Ingredient";

export interface Product {
    name:string,
    price:number,
    custom:boolean,
    productHasIngredient : Ingredient[]
}