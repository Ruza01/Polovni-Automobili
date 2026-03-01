import { createReducer, on } from "@ngrx/store";
import { addFavoriteSuccess, loadFavoritesSuccess } from "./favorites.action";
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
  }))

);

export function CarReducer(state: FavoritesState | undefined, action: any){
    return favoritesReducer(state,action);
}