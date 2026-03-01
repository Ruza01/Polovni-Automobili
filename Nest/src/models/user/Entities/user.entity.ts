import { Role } from 'src/models/auth/enums/role-enum';
import { Car } from 'src/models/car/entities/car.entity';
import { Favorite } from 'src/models/favorites/entities/favorite.entity';
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'users' })
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    username: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.MEMBER
    })
    role: Role

    @Column({ nullable:true })
    profileImagePath: string;

    @OneToMany(() => Car, car => car.user)
    userCars: Car[];

    @OneToMany(() => Favorite, favorite => favorite.user)
    favorites: Favorite[];
}