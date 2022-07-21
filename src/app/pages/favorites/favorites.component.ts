import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';
import {Observable, tap} from 'rxjs';
import {Beer} from '../../core/models';
import {favoritesSelector} from '../../state/favorites/favorites.selectors';
import {trackBeers} from '../../core/helpers';
import * as FavoritesActions from "../../state/favorites/favorites.actions";
import {RemoveFavoriteAlertComponent} from "../../UI/remove-favorite-alert/remove-favorite-alert.component";
import {MessageBoxService} from "../../core/services/message-box.service";


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {

  protected beers$: Observable<Beer[]> = this.store.select(favoritesSelector);
  protected trackBeersFn = trackBeers;

  constructor(private store: Store<AppState>, private dialogService: MessageBoxService) {
  }

  protected removeFromFavorites(beer: Beer): void {
    this.dialogService.open(RemoveFavoriteAlertComponent, {name: beer.name}).afterClosed()
      .subscribe((remove) => {
        if (remove) {
          this.store.dispatch(FavoritesActions.toggleFavorite({beer}));
        }
      });
  }
}
