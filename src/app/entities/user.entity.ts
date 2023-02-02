
import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Score } from "./score.entity";

@Entity({name : 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id : number

    @Column({unique : true})
    @IsNotEmpty()
    nom : string

    @Column()
    @IsNotEmpty()
    mdp : string

    @Column({type : 'boolean', default : false})
    admin : boolean

    @OneToMany(()=> Score, score => score.user)
    scores : Score[]

    @CreateDateColumn()
    createAt : Date

    @UpdateDateColumn()
    updateAt : Date
}
