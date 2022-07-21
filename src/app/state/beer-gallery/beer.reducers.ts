import {Beer} from '../../core/models';
import {createReducer, on} from '@ngrx/store';
import * as Actions from './beer.actions';

export const beerFeatureKey = 'beer';

export interface BeerState {
  beers: Beer[];
  randomBeer?: Beer;
  loading: boolean;
}

export const initialState: BeerState = {
  beers: [],
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(Actions.fetchBeersData, (state:BeerState) => ({
    ...state,
    loading: true
  })),
  on(Actions.fetchBeersDataSuccess, (state:BeerState, {beers}) => ({
    ...state,
    loading: false,
    beers
  })),
  on(Actions.fetchBeersDataFailure, (state:BeerState) => ({
    ...state,
    loading: false,
  })),
  on(Actions.fetchRandomBeerData, (state:BeerState) => ({
    ...state,
    loading: true
  })),
  on(Actions.fetchRandomBeerSuccess, (state:BeerState, {beer}) => ({
    ...state,
    loading: false,
    beer
  })),
  on(Actions.fetchBeersDataFailure, (state:BeerState) => ({
    ...state,
    loading: false,
  })),
)
