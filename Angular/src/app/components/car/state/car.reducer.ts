import { createReducer, on } from "@ngrx/store";
import { CarState, initialState } from "./car.state";
import { addCar, addCarImages, addCarSucces, deleteCarSucces, getCars, getCarsByFilterSuccess, getCarsSuccess } from "./car.action";


const _carReducer = createReducer(initialState,
      on(addCarSucces, (state, car) => ({
        ...state,
        cars: [...state.cars, car],
        error: null,
      })),
      on(addCarImages, (state, { images }) => ({
        ...state,
        images,
      })),
      on(getCarsSuccess, (state, { cars }) => ({
      ...state, 
      cars,
      images: cars.flatMap(car => car.images) 
      })),
      on(getCarsByFilterSuccess, (state, { cars }) => ({
        ...state,
        cars,
        })),
      on(deleteCarSucces, (state, { carId }) => ({
        ...state,
        cars: state.cars.filter(car => car.id !== carId)
      }))

    
)

export function CarReducer(state: CarState | undefined, action: any){
    return _carReducer(state,action);
}