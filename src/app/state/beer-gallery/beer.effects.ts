import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BeerApiService} from '../../core/services/beer-api.service';
import * as BeerActions from './beer.actions';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import {Beer, BeersData, PairedBeerData} from '../../core/models';
import {FetchBeersError} from '../../core/consts';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LocalStorageService} from '../../core/services/local-storage.service';

@Injectable()
export class BeerEffects {

  constructor(private actions$: Actions,
              private localStorageService: LocalStorageService,
              private beerService: BeerApiService,
              private snackBar: MatSnackBar) {
  }

  public fetchFoodPairing$ = createEffect(() => this.actions$.pipe(
    ofType(BeerActions.fetchFoodPairingData),
    switchMap(({food, page, perPage}) => {

      let pairedBeers: PairedBeerData | null = this.localStorageService.getPairedBeers();
      if (!food) {
        if (pairedBeers) {
          return of(pairedBeers).pipe(
            map((beers: PairedBeerData) => {
              return BeerActions.fetchFoodPairingDataSuccess(beers)
            }))
        }
      }

      food = food?.trim().replace(/\s\s+/g, '_');
      const beersObservable: Observable<Beer[]> = food ?
        this.beerService.fetchFoodPairing(food, page, perPage) :
        of([])
      return beersObservable.pipe(
        map((beers: Beer[]) => {
          pairedBeers = {term: food, beers, page, perPage};
          this.localStorageService.savePairedBeers(pairedBeers);
          return BeerActions.fetchFoodPairingDataSuccess(pairedBeers)
        }),
        catchError((error) => of(BeerActions.fetchFoodPairingDataFailure({message: FetchBeersError})))
      )
    })
  ))

  public fetchBeers$ = createEffect(() => this.actions$.pipe(
    ofType(BeerActions.fetchBeersData),
    switchMap(({page, perPage}) => {

      let beersData: BeersData | null = this.localStorageService.getAllBeers();
      if (beersData && page < 0) {
        return of(beersData).pipe(
          map((beers: BeersData) => {
            return BeerActions.fetchBeersDataSuccess(beers)
          }))
      }

      return this.beerService.fetchBeers(page, perPage).pipe(
        map((beers: Beer[]) => {
          beersData = {beers, page,perPage};
          this.localStorageService.saveAllBeers(beersData)
          return BeerActions.fetchBeersDataSuccess(beersData)
        }),
        catchError((error) => of(BeerActions.fetchBeersDataFailure({message: FetchBeersError})))
      )
    })
  ))

  public fetchRandomBeer = createEffect(() => this.actions$.pipe(
    ofType(BeerActions.fetchRandomBeerData),
    switchMap(() => {
      return this.beerService.fetchRandomBeer().pipe(
        map((beers: Beer[]) => BeerActions.fetchRandomBeerSuccess({beer: beers[0]}))
      )
    })
  ));

  public fetchBeersFailure$ = createEffect(() => this.actions$.pipe(
      ofType(BeerActions.fetchFoodPairingDataFailure),
      map(({message}) => {
        this.snackBar.open(message, 'Ok', {politeness: 'assertive', duration: 4000});
      })
    ), {dispatch: false}
  )


}
