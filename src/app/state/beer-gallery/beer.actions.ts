import {createAction, props} from '@ngrx/store';
import {Beer} from '../../core/models';

const FETCH_BEERS_DATA = '[Beers] Fetch data';
const FETCH_BEERS_DATA_SUCCESS = '[Beers] Fetch data success';
const FETCH_BEERS_DATA_FAILURE = '[Beers] Fetch data failure';

const FETCH_RANDOM_BEER_DATA = '[Beers] Fetch random beer';
const FETCH_RANDOM_BEER_DATA_SUCCESS = '[Beers] Fetch data success';
const FETCH_RANDOM_BEES_DATA_FAILURE = '[Beers] Fetch data failure';


export const fetchBeersData = createAction(
  FETCH_BEERS_DATA,
  props<{ page: number, perPage: number }>()
);

export const fetchBeersDataSuccess = createAction(
  FETCH_BEERS_DATA_SUCCESS,
  props<{ beers: Beer[] }>()
)
export const fetchBeersDataFailure = createAction(
  FETCH_BEERS_DATA_FAILURE,
)

export const fetchRandomBeerData = createAction(
  FETCH_RANDOM_BEER_DATA,
);

export const fetchRandomBeerSuccess = createAction(
  FETCH_RANDOM_BEER_DATA_SUCCESS,
  props<{ beer: Beer }>()
)
export const fetchRandomBeerFailure = createAction(
  FETCH_RANDOM_BEES_DATA_FAILURE,
)
