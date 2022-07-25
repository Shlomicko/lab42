import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';
import {Observable} from 'rxjs';
import {AlertDialogCloseData, AlertDialogConfig, Beer} from '../../core/models';
import {favoritesBeersSelector, showRemoveAllAlert} from '../../state/favorites/favorites.selectors';
import {trackBeers} from '../../core/helpers';
import * as FavoritesActions from "../../state/favorites/favorites.actions";
import {AlertDialogComponent} from "../../UI/remove-favorite-alert/alert-dialog.component";
import {MessageBoxService} from "../../core/services/message-box.service";
import {MoreBeerInfoDialogComponent} from "../../UI/beer-info-dialog/more-beer-info-dialog.component";


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {

  protected beers$: Observable<Beer[]> = this.store.select(favoritesBeersSelector);

  private showAlertDialog$ = this.store.select(showRemoveAllAlert)
    .subscribe((show: boolean | undefined) => this.showRemoveAllAlert = !!show);

  private showRemoveAllAlert: boolean = true;
  protected trackBeersFn = trackBeers;

  constructor(private store: Store<AppState>, private dialogService: MessageBoxService) {
  }

  protected removeFromFavorites(beer: Beer): void {
    if(!this.showRemoveAllAlert){
      this.dispatchToggleFavorites(beer);
      return;
    }

    const config: AlertDialogConfig = {
      message: `Remove ${beer.name} from favorites?`,
      showAgainOption: true
    }
    this.dialogService.open<AlertDialogComponent, AlertDialogConfig, AlertDialogCloseData>(AlertDialogComponent, config).afterClosed()
      .subscribe((result) => {
        if (!!result?.value) {
          this.dispatchToggleFavorites(beer);
          if (result.dontShowAgain) {
            this.store.dispatch(FavoritesActions.setShowAlertAgain({show: !result.dontShowAgain}))
          }
        }
      });
  }

  protected clearFavorites(): void {
    const config: AlertDialogConfig = {
      message: 'This will remove all beers from favorites',
      showAgainOption: false
    }
    this.dialogService.open<AlertDialogComponent, AlertDialogConfig, AlertDialogCloseData>(AlertDialogComponent, config).afterClosed()
      .subscribe((remove) => {
        if (remove?.value) {
          this.store.dispatch(FavoritesActions.removeAllFromFavorites());
        }
      });
  }

  protected dispatchToggleFavorites(beer: Beer): void {
    this.store.dispatch(FavoritesActions.toggleFavorite({beer}));
  }

  protected onMoreDetails(beer: Beer): void {
    this.dialogService.open(MoreBeerInfoDialogComponent, beer);
  }
}
