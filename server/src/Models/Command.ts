import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Command extends BaseEntity{
 
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    status:string

    @Column()
    amount:number

    @ManyToOne(()=>User, user => user.commands, {nullable:true})
    user:User

}