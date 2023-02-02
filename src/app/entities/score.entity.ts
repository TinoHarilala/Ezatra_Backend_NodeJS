import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Level } from "./level.entity";
import { User } from "./user.entity";

@Entity({name : 'scores'})
export class Score {

    @PrimaryGeneratedColumn()    
    id : number

    @Column()
    timer : number

    @Column()
    precision : number

    @Column()
    erreur : number

    @Column()
    score : number

    @ManyToOne(()=> User, user => user.scores)
    user : User

    @ManyToOne(()=> Level, level => level.scores)
    level : Level
}