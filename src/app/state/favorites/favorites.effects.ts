import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LocalStorageService} from '../../core/services/local-storage.service';
import * as FavoritesActions from './favorites.actions'
import {map, of, switchMap, withLatestFrom} from 'rxjs';
import {Beer} from '../../core/models';
import {Store} from '@ngrx/store';
import {favoritesBeersSelector} from './favorites.selectors';
import {AppState} from '../app.state';

@Injectable()
export class FavoritesEffects {

  constructor(private actions$: Actions,
              private localStorageService: LocalStorageService,
              private store: Store<AppState>) {
  }

  public getFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.getFavoritesFromLocalStorage),
    switchMap(() => {
      return of(this.localStorageService.getFavorites()).pipe(
        map((beers: Beer[]) => FavoritesActions.updateFavoritesFromLocalStorage({beers}))
      )
    })
  ))

  public toggleFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.toggleFavorite),
    withLatestFrom(this.store.select(favoritesBeersSelector)),
    switchMap(([, beers]) => {
      return of(this.localStorageService.saveFavorites(beers)).pipe(
        map((beersToSave: Beer[]) => FavoritesActions.updateFavoritesFromLocalStorage({beers: beersToSave}))
      )
    })
  ))

  public initFavoritesBeers$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.initFavoriteBeers),
    switchMap(() => {
      return of(this.localStorageService.getFavorites()).pipe(
        map((beers: Beer[]) => FavoritesActions.updateFavoritesFromLocalStorage({beers}))
      )
    })
  ))

  public removeAllFromFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.removeAllFromFavorites),
    switchMap(() => {
      return of(this.localStorageService.removeAllFavorites()).pipe(
        map(() => {
          return FavoritesActions.updateFavoritesFromLocalStorage({beers: []})
        })
      )
    })
  ))

  public setShowRemoveAlert$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.setShowAlertAgain),
    switchMap(({show}) => of(setTimeout(() => {}, 0)).pipe(
      map(() => {
        return FavoritesActions.saveShowAlertAgain({show})
      })
    ))
  ))
}
