import {Injectable} from '@angular/core';
import {combineLatest, map, Observable, shareReplay, takeUntil} from 'rxjs';
import {Beer, BeersData, PairedBeerData} from '../models';
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
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class BeersStateService {

  private availableBeers$: Observable<BeersData> = this.store.select(selectBeers);
  private pairedBeers$: Observable<PairedBeerData> = this.store.select(selectPairedBeers);
  public readonly favoriteBeers$: Observable<Beer[]> = this.store.select(favoritesBeersSelector);
  public readonly randomBeer$: Observable<Beer | undefined> = this.store.select(selectRandomBeer);
  public readonly beersLoading$: Observable<boolean> = this.store.select(selectLoadingBeers);

  public readonly beers$: Observable<BeersData> = combineLatest([
    this.availableBeers$,
    this.favoriteBeers$,
  ]).pipe(
    map(([beers, favBeers]) => this.createBeersListWithFavoriteProperty(beers as PairedBeerData, favBeers)),
  );

  public readonly foodAndBeers$: Observable<PairedBeerData> = combineLatest([
    this.pairedBeers$,
    this.favoriteBeers$,
  ]).pipe(
    map(([beers, favBeers]) => this.createBeersListWithFavoriteProperty(beers as PairedBeerData, favBeers)),
  );

  constructor(private store: Store<AppState>, private localStorageService: LocalStorageService) {
  }

  public getBeersFromStorage(): PairedBeerData | null {
    return this.localStorageService.getPairedBeers();
  }

  public dispatchFetchAllBeers(page: number, perPage: number = 8): void {
    this.store.dispatch(BeerActions.fetchBeersData({page, perPage}));
  }

  public initFetchAllBeers(): void {
    this.store.dispatch(BeerActions.fetchBeersData({page: -1, perPage: 8}));
  }

  public fetchFavorites(): void {
    this.store.dispatch(FavoritesActions.getFavoritesFromLocalStorage());
  }

  public dispatchFetchByFoodPairing(food: string, page: number = 1, perPage: number = 8): void {
    this.store.dispatch(BeerActions.fetchFoodPairingData({food, page, perPage}));
  }

  public toggleFavorites(beer: Beer): void {
    this.store.dispatch(FavoritesActions.toggleFavorite({beer}));
  }

  public fetchRandoBeer(): void {
    this.store.dispatch(BeerActions.fetchRandomBeerData());
  }

  private createBeersListWithFavoriteProperty(beerData: PairedBeerData, favBeers: Beer[]): PairedBeerData {
    const beersWithIsFavorite: Beer[] = beerData?.beers?.map<Beer>(beer => ({
      ...beer,
      isFavorite: !!favBeers.find((favBeer) => beer.id === favBeer.id)
    }))
    return {...beerData, beers: beersWithIsFavorite};
  }
}
