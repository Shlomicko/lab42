import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BeersStateService} from "../../core/services/beers-state.service";
import {Beer} from "../../core/models";
import {Observable} from "rxjs";
import {MessageBoxService} from "../../core/services/message-box.service";
import {MoreBeerInfoDialogComponent} from "../../UI/beer-info-dialog/more-beer-info-dialog.component";

@Component({
  selector: 'app-beers-selection',
  templateUrl: './beers-selection.component.html',
  styleUrls: ['./beers-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeersSelectionComponent implements OnInit {

  protected readonly perPage: number = 8;
  protected beers$: Observable<Beer[]> = this.beersState.beers$;
  protected beersLoading$: Observable<boolean> = this.beersState.beersLoading$;

  constructor(private beersState: BeersStateService, private dialogService: MessageBoxService) {
  }

  ngOnInit(): void {
    this.beersState.fetchAll(1, this.perPage);
  }

  protected toggleFavorite(beer: Beer): void {
    this.beersState.toggleFavorites(beer);
  }

  protected onMoreDetails(beer: Beer): void {
    this.dialogService.open(MoreBeerInfoDialogComponent, beer);
  }

  protected onPageChange(page: number): void {
    this.beersState.fetchAll(++page, this.perPage);
  }
}
