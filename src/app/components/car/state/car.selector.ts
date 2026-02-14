import { createFeatureSelector, createSelector } from "@ngrx/store"
import { CarState } from "./car.state"


export const CAR_STATE_NAME = 'car';

export const selectCarState = createFeatureSelector<CarState>(CAR_STATE_NAME);

export const selectCarImages = createSelector(
  selectCarState,
  (state: CarState) => state.images
);

export const selectAllCars = createSelector(
  selectCarState,
  (state: CarState) => state.cars
)

export const selectAllImages = createSelector(
  selectCarState,
  (state: CarState) => state.images
)

