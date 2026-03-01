import { Car } from "../car.model";
import { User } from "../user.model";

export interface Favorites {
    id: number;
    user: User;
    car: Car;
    createdAt: Date
}