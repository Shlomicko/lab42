import {Beer, BeersData, PairedBeerData} from '../../core/models';
import {createReducer, on} from '@ngrx/store';
import * as Actions from './beer.actions';

export const beerFeatureKey = 'beer';

export interface BeerState {
  beers: BeersData;
  foodPairedBeers: PairedBeerData;
  randomBeer?: Beer;
  loading: boolean;
}

export const initialState: BeerState = {
  beers: {beers: [], page: 0, perPage: 0},
  foodPairedBeers: {beers: [], page: 0, perPage: 0, term:''},
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(Actions.fetchFoodPairingData, (state: BeerState) => ({
    ...state,
    loading: true
  })),
  on(Actions.fetchFoodPairingDataSuccess, (state: BeerState, beersData) => ({
    ...state,
    loading: false,
    foodPairedBeers: beersData
  })),
  on(Actions.fetchFoodPairingDataFailure, (state: BeerState) => ({
    ...state,
    loading: false,
  })),
  on(Actions.fetchBeersData, (state: BeerState) => ({
    ...state,
    loading: true
  })),
  on(Actions.fetchBeersDataSuccess, (state: BeerState, beersData) => ({
    ...state,
    loading: false,
    beers: beersData
  })),
  on(Actions.fetchBeersDataFailure, (state: BeerState) => ({
    ...state,
    loading: false,
  })),
  on(Actions.fetchRandomBeerData, (state: BeerState) => ({
    ...state,
    loading: true
  })),
  on(Actions.fetchRandomBeerSuccess, (state: BeerState, {beer}) => ({
    ...state,
    loading: false,
    randomBeer: beer
  })),
  on(Actions.fetchFoodPairingDataFailure, (state: BeerState) => ({
    ...state,
    loading: false,
  })),
)
