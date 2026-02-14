import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./car.entity";


@Entity({name: "imgs"})
export class carImages extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imagePath: string;

    @ManyToOne(type => Car, car => car.images, { onDelete: 'CASCADE' })
    cars: Car;
}