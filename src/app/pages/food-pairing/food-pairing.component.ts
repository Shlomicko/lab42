import {ChangeDetectionStrategy, Component, OnDestroy, ViewChild} from '@angular/core';
import {Observable, Subject, takeWhile} from 'rxjs';
import {Beer, PairedBeerData} from '../../core/models';
import {trackBeers} from '../../core/helpers';
import {MessageBoxService} from '../../core/services/message-box.service';
import {MoreBeerInfoDialogComponent} from '../../UI/beer-info-dialog/more-beer-info-dialog.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {BeersStateService} from '../../core/services/beers-state.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-food-pairing',
  templateUrl: './food-pairing.component.html',
  styleUrls: ['./food-pairing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodPairingComponent implements OnDestroy {

  protected foodPairingString: string = '';

  protected readonly perPage: number = 8;
  protected beersLoading$: Observable<boolean> = this.beersState.beersLoading$

  @ViewChild('paginator', {static: false}) paginator!: MatPaginator

  protected beers$: Observable<PairedBeerData> = this.beersState.foodAndBeers$;

  protected trackBeersFn: (index: number, beer: Beer) => number = trackBeers;
  private unSubscriber$: Subject<void> = new Subject<void>();

  constructor(private beersState: BeersStateService,
              private activatedRoute: ActivatedRoute,
              private dialogService: MessageBoxService) {
  }

  async ngOnInit(): Promise<void> {
    this.beers$.pipe(
      takeWhile(() => !this.foodPairingString)
    ).subscribe(
      (data: PairedBeerData) => {
        this.foodPairingString = data.term;
      }
    );
    this.beersState.dispatchFetchByFoodPairing(this.foodPairingString);
  }

  protected toggleFavorite(beer: Beer): void {
    this.beersState.toggleFavorites(beer);
  }

  protected onMoreDetails(beer: Beer): void {
    this.dialogService.open(MoreBeerInfoDialogComponent, beer);
  }

  protected onPageChange(event: PageEvent): void {
    this.fetchBeers(++event.pageIndex);
  }

  private fetchBeers(page: number = 1): void {
    this.beersState.dispatchFetchByFoodPairing(this.foodPairingString, page, this.perPage);
  }

  protected onFoodPairingQuery(query: string): void {
    this.foodPairingString = query;
    this.paginator?.firstPage();
    this.fetchBeers();
  }

  ngOnDestroy(): void {
    this.unSubscriber$.next()
    this.unSubscriber$.complete();
  }
}
