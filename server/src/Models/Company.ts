import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { Terminal } from "./Terminal"
import {User} from './User'

@Entity()
export class Company extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    country:string

    @Column()
    town:string

    @Column("timestamp")
    createdAt:Date

    @OneToMany(()=>Terminal, terminal => terminal.compagny)
    terminals:Terminal[]

    @OneToMany(()=>User, user => user.compagny)
    users:User[]
}