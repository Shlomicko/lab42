import * as fromReducer from './favorites.reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BeerFavoritesState} from './favorites.reducers';
import {selectFavorites} from "../app.state";

//export const beerFeatureSelector = createFeatureSelector<fromReducer.BeerFavoritesState>(fromReducer.beerFavoritesFeatureKey);
export const favoritesSelector = createSelector(
  selectFavorites,
  (state: BeerFavoritesState) => state?.beers
);

