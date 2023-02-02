import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Score } from "./score.entity";

@Entity({name : 'levels'})
export class Level {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    exercice : number

    @Column()
    characters : string

    @Column()
    length : number

    @OneToMany(()=> Score, score => score.level)
    scores : Score

}