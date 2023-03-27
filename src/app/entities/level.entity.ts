import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @UpdateDateColumn()
    updated!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}