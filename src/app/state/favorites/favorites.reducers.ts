import {Beer} from '../../core/models';
import {createReducer, on} from '@ngrx/store';
import * as Actions from './favorites.actions';

export interface BeerFavoritesState {
  beers: Beer[];
  loading: boolean,
  showAlertDialogAgain: boolean
}

export const initialState: BeerFavoritesState = {
  beers: [],
  loading: false,
  showAlertDialogAgain: true
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
    beers: beers.map<Beer>((beer) => {
      return {...beer, isFavorite: true}
    }),
    loading: false
  })),
  on(Actions.initFavoriteBeers, (state: BeerFavoritesState) => ({
    ...state,
    loading: true
  })),
  on(Actions.removeAllFromFavorites, (state:BeerFavoritesState) => ({
    ...state,
    beers: [],
    loading: false
  })),
  on(Actions.saveShowAlertAgain, (state: BeerFavoritesState, {show}) => ({
    ...state,
    showAlertDialogAgain: show
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
