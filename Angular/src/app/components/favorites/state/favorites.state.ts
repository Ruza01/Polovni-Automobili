import { Favorites } from "src/app/models/Interfaces/favorites-interface";

export interface FavoritesState {
  favorites: Favorites[];
}

export const initialState: FavoritesState = {
  favorites: []
};
