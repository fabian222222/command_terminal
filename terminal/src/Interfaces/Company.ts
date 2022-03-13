import { User } from "./User";
import { Terminal } from "./Terminal";

export interface Company {
    id?:number,
    name:string,
    country:string,
    twon:string,
    createdAt:Date,
    terminals:Terminal[],
    users:User[]
}