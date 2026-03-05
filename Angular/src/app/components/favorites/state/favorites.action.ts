import { createAction, props } from "@ngrx/store";
import { Favorites } from "src/app/models/Interfaces/favorites-interface";


export const loadFavorites = createAction('[Favorites] Load');
export const loadFavoritesSuccess = createAction('[Favorites] Load Success', props<{ favorites: Favorites[] }>());

export const addFavorite = createAction('[Favorites] Add', props<{ carId: number }>());
export const addFavoriteSuccess = createAction('[Favorites] Add Favorite Success', props<{ favorite: Favorites }>());

export const removeFavorite = createAction('[Favorites] Remove', props<{ carId: number }>());
export const removeFavoriteSuccess = createAction('[Favorites] Remove Success', props<{ carId: number }>());
export const removeFavoriteFailure = createAction('[Favorites] Remove Failure', props<{ error: any }>());