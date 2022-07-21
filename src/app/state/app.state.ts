import {BeerFavoritesState} from "./favorites/favorites.reducers";

export interface AppState {
  favorites: BeerFavoritesState;
}

export const selectFavorites = (state: AppState) => state?.favorites;
