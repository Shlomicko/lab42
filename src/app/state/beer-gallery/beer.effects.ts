import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BeerApiService} from "../../core/services/beer-api.service";
import * as BeerActions from './beer.actions';
import {map, switchMap} from "rxjs";
import {Beer} from "../../core/models";

@Injectable()
export class BeerEffects {

  constructor(private actions$: Actions, private beerService: BeerApiService) {
  }

  public fetchBeers$ = createEffect(() => this.actions$.pipe(
    ofType(BeerActions.fetchBeersData),
    switchMap(({page, perPage}) => {
      return this.beerService.fetchBeers(page, perPage).pipe(
        map((beers: Beer[]) => BeerActions.fetchBeersDataSuccess({beers}))
      )
    })
  ))

  public fetchRandomBeer = createEffect(() => this.actions$.pipe(
    ofType(BeerActions.fetchRandomBeerData),
    switchMap(() => {
      return this.beerService.fetchRandomBeer().pipe(
        map((beer: Beer) => BeerActions.fetchRandomBeerSuccess({beer}))
      )
    })
  ))
}
