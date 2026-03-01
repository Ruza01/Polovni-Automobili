import { Car } from "src/models/car/entities/car.entity";
import { User } from "src/models/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorite {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.favorites, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Car, car => car.favorites, { onDelete: "CASCADE" })
    car: Car;

    @CreateDateColumn()
    createdAt: Date;
}
