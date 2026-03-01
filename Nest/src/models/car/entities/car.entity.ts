import { IsNotEmpty } from "class-validator";
import { User } from "src/models/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { carImages } from "./carImages.entity";
import { Favorite } from "src/models/favorites/entities/favorite.entity";


@Entity({ name: "cars"})
export class Car extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stanje: string;

    @Column()
    marka: string;

    @Column()
    model: string;

    @Column()
    godiste: number;

    @Column()
    kilometraza: number;

    @Column()
    karoserija: string;
    
    @Column()
    gorivo: string;

    @Column()
    kubikaza: number;

    @Column()
    snagaMotora: number;

    @Column()
    cena: number;

    @Column()
    fiksnaCena: string;

    @Column()
    zamena: string;

    @ManyToOne(() => User, user => user.userCars)
    user: User;

    @OneToMany(() => carImages, carImg => carImg.cars)
    images: carImages[];

    @OneToMany(() => Favorite, favorite => favorite.car)
    favorites: Favorite[];

}