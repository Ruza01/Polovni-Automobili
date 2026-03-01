import { createAction, props } from "@ngrx/store";
import { AddCarDto } from "src/app/Dto/add-car.dto";
import { Car } from "src/app/models/car.model";

export const addCar = createAction('Add Car', props<{ carDto: AddCarDto }>() );
export const addCarSucces = createAction('Add Car Succes', props<{ car: Car }>() );

export const addCarImages = createAction('Add Car Image', props<{ images: any[] }>() );

export const getCars = createAction('Get cars');
export const getCarsSuccess = createAction('Get cars success', props<{ cars: Car[] }>() );

export const deleteCar = createAction('Delete car', props< { carId: number } >() );
export const deleteCarSucces = createAction('Delete car Success', props< { carId: number} >() );

export const getCarsByFilter = createAction('Get cars by filter', props<{ value: string, filterType: string }>() );
export const getCarsByFilterSuccess = createAction('Get cars by stanje success', props<{ cars: Car[] }>() );
