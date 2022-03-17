import { User } from "./User";
import { Product } from "./Product";

export interface Command {
    id?:number,
    status:string,
    amount:number,
    custom:boolean,
    date:Date,
    user?:User,
    products:Product[]
}