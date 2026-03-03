import { User } from "src/models/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {

  @PrimaryGeneratedColumn()
  id: number;

  //korisnik koji daje recenziju
  @ManyToOne(() => User, user => user.reviewsGiven, { onDelete: 'CASCADE' })
  reviewer: User;

  //korisnik koji prima recenziju
  @ManyToOne(() => User, user => user.reviewsReceived, { onDelete: 'CASCADE' })
  reviewedUser: User;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
