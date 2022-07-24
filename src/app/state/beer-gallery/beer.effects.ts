import {Injectable} from "@angular/core";
import {Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import {BeerApiService} from "../../core/services/beer-api.service";
import * as BeerActions from './beer.actions';
import {catchError, EMPTY, map, Observable, of, switchMap} from "rxjs";
import {Beer} from "../../core/models";
import {FetchBeersError} from "../../core/consts";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class BeerEffects {

  constructor(private actions$: Actions, private beerService: BeerApiService, private snackBar: MatSnackBar) {
  }

  public fetchBeers$ = createEffect(() => this.actions$.pipe(
    ofType(BeerActions.fetchBeersData),
    switchMap(({food, page, perPage}) => {
      food = food.trim().replace(/\s\s+/g, '_');
      const observableOfBeers: Observable<Beer[]> = !!food?this.beerService.fetchFoodPairing(food, page, perPage):of([]);
      return observableOfBeers.pipe(
        map((beers: Beer[]) => BeerActions.fetchBeersDataSuccess({beers})),
        catchError((error) => of(BeerActions.fetchBeersDataFailure({message: FetchBeersError})))
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
  ));

  public fetchBeersFailure$ = createEffect(() => this.actions$.pipe(
      ofType(BeerActions.fetchBeersDataFailure),
      map(({message}) => {
        this.snackBar.open(message, 'Ok', {politeness: 'assertive', duration: 4000});
      })
    ), {dispatch: false}
  )
}
