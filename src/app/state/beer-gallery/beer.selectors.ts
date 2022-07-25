import * as fromReducer from './beer.reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BeerState} from './beer.reducers';

export const beerFeatureSelector = createFeatureSelector<fromReducer.BeerState>(fromReducer.beerFeatureKey);

export const selectBeers = createSelector(
  beerFeatureSelector,
  (state: BeerState) => {
    return state?.beers
  }
);
export const selectPairedBeers = createSelector(
  beerFeatureSelector,
  (state: BeerState) => {
    return state?.foodPairedBeers
  }
);

export const selectLoadingBeers = createSelector(
  beerFeatureSelector,
  (state: BeerState) => state?.loading
);

export const selectRandomBeer = createSelector(
  beerFeatureSelector,
  (state: BeerState) => state?.randomBeer
);
