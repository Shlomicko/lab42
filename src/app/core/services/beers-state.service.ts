import {Injectable} from '@angular/core';
import {map, tap, Observable, Subject, withLatestFrom, combineLatest} from 'rxjs';
import {Beer} from '../models';
import {Store} from '@ngrx/store';
import {selectBeers, selectLoadingBeers} from '../../state/beer-gallery/beer.selectors';
import {favoritesBeersSelector} from '../../state/favorites/favorites.selectors';
import {AppState} from '../../state/app.state';
import * as BeerActions from '../../state/beer-gallery/beer.actions';
import * as FavoritesActions from "../../state/favorites/favorites.actions";

@Injectable({
  providedIn: 'root'
})
export class BeersStateService {

  private availableBeers$: Observable<Beer[]> = this.store.select(selectBeers);
  private favoriteBeers$: Observable<Beer[]> = this.store.select(favoritesBeersSelector);
  public readonly beersLoading$: Observable<boolean> = this.store.select(selectLoadingBeers);
  public readonly beers$: Observable<Beer[]> = combineLatest([
    this.availableBeers$,
    this.favoriteBeers$,
  ]).pipe(
    map(([beers, favBeers]) => {
      return beers.map(beer => ({
        ...beer,
        isFavorite: !!favBeers.find((favBeer) => beer.id === favBeer.id)
      }))
    })
  );

  constructor(private store: Store<AppState>) {

  }

  public fetchAll(page: number = 1, perPage: number = 8): void {
    this.store.dispatch(BeerActions.fetchBeersData({page, perPage}));
  }

  public fetchFavorites(beer: Beer): void {

  }

  public fetchByFoodPairing(food: string, page: number = 1, perPage: number = 8): void {
    this.store.dispatch(BeerActions.fetchFoodPairingData({food, page, perPage}));
  }

  public toggleFavorites(beer: Beer): void {
    this.store.dispatch(FavoritesActions.toggleFavorite({beer}));
  }

}
