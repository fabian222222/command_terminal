import { Command } from "./Command"
import { Company } from "./Company"

export interface User {

    id?:number,
    firstname:string,
    lastname:string,
    mail:string,
    role:string,
    password:string,
    createdAt:Date,
    commands:Command[],
    company:Company

}