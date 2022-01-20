import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { Command } from "./Command"
import { Company } from "./Company"

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    firstname:string

    @Column()
    lastname:string

    @Column()
    mail:string

    @Column()
    role:string

    @Column()
    password:string

    @Column("timestamp")
    createdAt:Date

    @OneToMany(()=>Command, command=>command.user)
    commands:Command[]

    @ManyToOne(()=>Company, company=>company.users)
    compagny:Company
}