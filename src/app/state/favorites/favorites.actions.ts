import {createAction, props} from '@ngrx/store';
import {Beer} from '../../core/models';

const GET_FAVORITES_DATA = '[Favorites] Get beers';
const INIT_FAVORITES_DATA = '[Favorites] Init beers';
const UPDATE_FAVORITES_FROM_LOCAL_STORAGE = '[Favorites] Update from local storage';
const TOGGLE_FAVORITES = '[Favorites] Toggle beer';

export const initFavoriteBeers = createAction(
  INIT_FAVORITES_DATA
)

export const updateFavoritesFromLocalStorage = createAction(
  UPDATE_FAVORITES_FROM_LOCAL_STORAGE,
  props<{ beers: Beer[] }>()
);

export const getFavoritesFromLocalStorage = createAction(
  GET_FAVORITES_DATA,
);

export const toggleFavorite = createAction(
  TOGGLE_FAVORITES,
  props<{ beer: Beer }>()
)
