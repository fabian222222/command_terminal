import { Ingredient } from "./Ingredient";

export interface Product {
    id?:number,
    name:string,
    price:number,
    ingredients : Ingredient[]
}