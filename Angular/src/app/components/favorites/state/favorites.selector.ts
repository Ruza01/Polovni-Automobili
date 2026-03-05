import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FavoritesState } from "./favorites.state";

export const FAVORITES_STATE_NAME = 'favorites'; 

export const selectFavoritesState = createFeatureSelector<FavoritesState>(FAVORITES_STATE_NAME);

export const selectFavorites = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.favorites
);