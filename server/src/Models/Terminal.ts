import{Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Company } from './Company'

@Entity()
export class Terminal extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    number:number

    @Column()
    active:boolean

    @Column('timestamp')
    createdAt:Date

    @ManyToOne(()=>Company, company => company.terminals)
    compagny: Company

}