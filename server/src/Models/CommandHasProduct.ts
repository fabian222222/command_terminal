import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Command } from "./Command"
import { Product } from "./Product"

@Entity()
export class CommandHasProduct extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Product, product => product.commandHasProduct, {
        onDelete : "SET NULL"
    })
    product:Product

    @ManyToOne(()=>Command, command=>command.products)
    command:Command
}