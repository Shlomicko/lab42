import {BeerFavoritesState} from './favorites.reducers';
import {createSelector} from '@ngrx/store';
import {selectFavorites} from '../app.state';

export const favoritesBeersSelector = createSelector(
  selectFavorites,
  (state: BeerFavoritesState) => state?.beers
);

export const showRemoveAllAlert = createSelector(
  selectFavorites,
  (state: BeerFavoritesState) => state?.showAlertDialogAgain
)



