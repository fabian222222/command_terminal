import { BaseEntity, Column, Entity, ManyToOne, OneToMany,PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
import { CommandHasProduct } from './CommandHasProduct'

@Entity()
export class Command extends BaseEntity{
 
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    status:string

    @Column()
    amount:number

    @Column({nullable:true})
    date:Date

    @ManyToOne(()=>User, user => user.commands, {nullable:true})
    user:User

    @OneToMany(()=>CommandHasProduct, productHasIngredient=>productHasIngredient.command)
    products:CommandHasProduct[]
}