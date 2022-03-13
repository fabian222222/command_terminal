import { Company } from "./Company";

export interface Terminal {
    id?:number,
    name:string,
    number:string,
    active:boolean,
    createdAt:Date,
    company:Company
}