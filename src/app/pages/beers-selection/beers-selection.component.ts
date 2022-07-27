import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BeersStateService} from '../../core/services/beers-state.service';
import {Beer, BeersData} from '../../core/models';
import {Observable} from 'rxjs';
import {MessageBoxService} from '../../core/services/message-box.service';
import {MoreBeerInfoDialogComponent} from '../../UI/beer-info-dialog/more-beer-info-dialog.component';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-beers-selection',
  templateUrl: './beers-selection.component.html',
  styleUrls: ['./beers-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeersSelectionComponent implements OnInit {

  protected readonly perPage: number = 8;
  protected beers$: Observable<BeersData> = this.beersState.beers$;
  protected beersLoading$: Observable<boolean> = this.beersState.beersLoading$;

  constructor(private beersState: BeersStateService, private dialogService: MessageBoxService) {
  }

  ngOnInit(): void {
    this.beersState.initFetchAllBeers();
  }

  protected toggleFavorite(beer: Beer): void {
    this.beersState.toggleFavorites(beer);
  }

  protected onMoreDetails(beer: Beer): void {
    this.dialogService.open(MoreBeerInfoDialogComponent, beer);
  }

  protected onPageChange(event: PageEvent): void {
    this.beersState.dispatchFetchAllBeers(++event.pageIndex, this.perPage);
  }
}
