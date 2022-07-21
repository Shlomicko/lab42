import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {LocalStorageService} from "../../core/services/local-storage.service";
import * as FavoritesActions from './favorites.actions'
import {map, switchMap, withLatestFrom} from "rxjs";
import {Beer} from "../../core/models";
import {Store} from "@ngrx/store";
import {favoritesSelector} from "./favorites.selectors";
import {AppState} from "../app.state";

@Injectable()
export class FavoritesEffects {

  constructor(private actions$: Actions, private favoritesLocalStorage: LocalStorageService, private store: Store<AppState>) {
  }

  public getFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.getFavoritesFromLocalStorage),
    switchMap(() => {
      console.log('getFavorites$')
      return this.favoritesLocalStorage.getFavorites().pipe(
        map((beers: Beer[]) => FavoritesActions.updateFavoritesFromLocalStorage({beers}))
      )
    })
  ))

  public toggleFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.toggleFavorite),
    withLatestFrom(this.store.select(favoritesSelector)),
    switchMap(([, beers]) => {
      console.log('toggleFavorites$')
      return this.favoritesLocalStorage.saveFavorites(beers).pipe(
        map((beersToSave: Beer[]) => FavoritesActions.updateFavoritesFromLocalStorage({beers: beersToSave}))
      )
    })
  ))

  public initFavoritesBeers$ = createEffect(() => this.actions$.pipe(
    ofType(FavoritesActions.initFavoriteBeers),
    switchMap(() => {
      return this.favoritesLocalStorage.getFavorites().pipe(
        map((beers: Beer[]) => FavoritesActions.updateFavoritesFromLocalStorage({beers}))
      )
    })
  ))

}
