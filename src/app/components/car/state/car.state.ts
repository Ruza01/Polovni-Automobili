import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { AddCarDto } from "src/app/Dto/add-car.dto";
import { Car } from "src/app/Models/car.model";


export interface CarState {
    cars: any[];
    images: any
}

export const initialState: CarState = {
    cars: [],
    images: []
};

