import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {combineLatest, map, Observable} from 'rxjs';
import {Beer} from '../../core/models';
import {selectBeers, selectLoadingBeers} from '../../state/beer-gallery/beer.selectors';
import * as BeerActions from '../../state/beer-gallery/beer.actions';
import * as FavoritesActions from '../../state/favorites/favorites.actions';
import {favoritesSelector} from '../../state/favorites/favorites.selectors';
import {AppState} from '../../state/app.state';
import {trackBeers} from '../../core/helpers';
import {MessageBoxService} from '../../core/services/message-box.service';
import {MoreBeerInfoDialogComponent} from '../../UI/beer-info-dialog/more-beer-info-dialog.component';
import {MatPaginator, PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent {

  private foodPairingString!: string;

  protected readonly perPage: number = 6;
  private availableBeers$: Observable<Beer[]> = this.store.select(selectBeers);
  private favoriteBeers$: Observable<Beer[]> = this.store.select(favoritesSelector);
  protected beersLoading$: Observable<boolean> = this.store.select(selectLoadingBeers);

  @ViewChild('paginator', {static: false}) paginator!: MatPaginator

  protected beers$: Observable<Beer[]> = combineLatest([
    this.availableBeers$,
    this.favoriteBeers$,
    this.beersLoading$
  ]).pipe(
    map(([beers, favBeers]) => {
      return beers.map(beer => ({
        ...beer,
        isFavorite: !!favBeers.find((favBeer) => beer.id === favBeer.id)
      }))
    })
  );

  protected trackBeersFn = trackBeers;

  constructor(private store: Store<AppState>, private dialogService: MessageBoxService) {
  }

  protected toggleFavorite(beer: Beer): void {
    this.store.dispatch(FavoritesActions.toggleFavorite({beer}));
  }

  protected onMoreDetails(beer: Beer): void {
    this.dialogService.open(MoreBeerInfoDialogComponent, beer);
  }

  protected onPageChange(event: PageEvent): void {
    this.fetchBeers(++event.pageIndex);
  }

  private fetchBeers(page: number = 1): void {
    this.store.dispatch(BeerActions.fetchBeersData({food: this.foodPairingString, page, perPage: this.perPage}));
  }

  protected onFoodPairingQuery(query: string): void {
    this.foodPairingString = query;
    this.paginator?.firstPage();
    console.log(this.paginator);
    this.fetchBeers();
  }
}
