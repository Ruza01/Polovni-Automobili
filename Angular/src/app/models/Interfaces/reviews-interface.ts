import { User } from "../user.model";

export interface Review {
  id: number;
  reviewer: User;
  reviewedUser: User;
  rating: number;
  comment?: string;
  createdAt: Date;
}