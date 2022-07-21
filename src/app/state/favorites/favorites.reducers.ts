import {Beer} from '../../core/models';
import {createReducer, on} from '@ngrx/store';
import * as Actions from './favorites.actions';

export const beerFavoritesFeatureKey = 'favorites';

export interface BeerFavoritesState {
  beers: Beer[];
  loading: boolean
}

export const initialState: BeerFavoritesState = {
  beers: [],
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(Actions.toggleFavorite, (state: BeerFavoritesState, {beer}) => ({
    ...state,
    beers: toggleFavorites(state.beers, beer),
    loading: true
  })),
  on(Actions.updateFavoritesFromLocalStorage, (state: BeerFavoritesState, {beers}) => ({
    ...state,
    beers,
    loading: false
  })),
  on(Actions.initFavoriteBeers, (state: BeerFavoritesState) => ({
    ...state,
    loading: true
  }))
)

const toggleFavorites = (beers: Beer[], beer: Beer): Beer[] => {
  const contains: Beer | undefined = beers.find(item => item.id === beer.id);
  let newFavorites: Beer[];
  if (!contains) {
    newFavorites = [...beers, beer];
  } else {
    newFavorites = beers.filter(item => item.id !== beer.id);
  }
  return newFavorites;
}
