import {Injectable} from '@angular/core';
import {combineLatest, map, Observable} from 'rxjs';
import {Beer} from '../models';
import {Store} from '@ngrx/store';
import {
  selectBeers,
  selectLoadingBeers,
  selectPairedBeers,
  selectRandomBeer
} from '../../state/beer-gallery/beer.selectors';
import {favoritesBeersSelector} from '../../state/favorites/favorites.selectors';
import {AppState} from '../../state/app.state';
import * as BeerActions from '../../state/beer-gallery/beer.actions';
import * as FavoritesActions from "../../state/favorites/favorites.actions";

@Injectable({
  providedIn: 'root'
})
export class BeersStateService {

  private availableBeers$: Observable<Beer[]> = this.store.select(selectBeers);
  private pairedBeers$: Observable<Beer[]> = this.store.select(selectPairedBeers);
  public readonly favoriteBeers$: Observable<Beer[]> = this.store.select(favoritesBeersSelector);
  public readonly randomBeer$: Observable<Beer | undefined> = this.store.select(selectRandomBeer);
  public readonly beersLoading$: Observable<boolean> = this.store.select(selectLoadingBeers);

  public readonly beers$: Observable<Beer[]> = combineLatest([
    this.availableBeers$,
    this.favoriteBeers$,
  ]).pipe(
    map(([beers, favBeers]) => this.createBeersListWithFavoriteProperty(beers, favBeers))
  );

  public readonly foodAndBeers$: Observable<Beer[]> = combineLatest([
    this.pairedBeers$,
    this.favoriteBeers$,
  ]).pipe(
    map(([beers, favBeers]) => this.createBeersListWithFavoriteProperty(beers, favBeers))
  );

  constructor(private store: Store<AppState>) {
  }

  public fetchAll(page: number = 1, perPage: number = 8): void {
    this.store.dispatch(BeerActions.fetchBeersData({page, perPage}));
  }

  public fetchFavorites(): void {
    this.store.dispatch(FavoritesActions.getFavoritesFromLocalStorage());
  }

  public fetchByFoodPairing(food: string, page: number = 1, perPage: number = 8): void {
    this.store.dispatch(BeerActions.fetchFoodPairingData({food, page, perPage}));
  }

  public toggleFavorites(beer: Beer): void {
    this.store.dispatch(FavoritesActions.toggleFavorite({beer}));
  }

  public fetchRandoBeer(): void{
    this.store.dispatch(BeerActions.fetchRandomBeerData());
  }

  private createBeersListWithFavoriteProperty(beers: Beer[], favBeers: Beer[]): Beer[] {
    return beers?.map<Beer>(beer => ({
      ...beer,
      isFavorite: !!favBeers.find((favBeer) => beer.id === favBeer.id)
    }))
  }
}
