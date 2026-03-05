import { createReducer, on } from "@ngrx/store";
import { addFavoriteSuccess, loadFavoritesSuccess, removeFavoriteSuccess } from "./favorites.action";
import { FavoritesState, initialState } from "./favorites.state";

export const favoritesReducer = createReducer(
  initialState,
  on(loadFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites,
  })),
  on(addFavoriteSuccess, (state, { favorite }) => ({
    ...state,
    favorites: [...state.favorites, favorite],
  })),
    on(removeFavoriteSuccess, (state, { carId }) => ({
    ...state,
    favorites: state.favorites.filter(fav => fav.car.id !== carId)
  }))

);

export function CarReducer(state: FavoritesState | undefined, action: any){
    return favoritesReducer(state,action);
}