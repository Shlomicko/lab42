import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Beer} from '../../core/models';
import {trackBeers} from '../../core/helpers';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-beers-view',
  templateUrl: './beers-view.component.html',
  styleUrls: ['./beers-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeersViewComponent {

  @Input() beers: Beer[] = [];
  @Input() beersPerPage: number = 6;
  @Output() onToggleFavorite: EventEmitter<Beer> = new EventEmitter<Beer>();
  @Output() onMoreDetails: EventEmitter<Beer> = new EventEmitter<Beer>();
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  protected trackBeersFn: (index: number, beer: Beer) => number = trackBeers;

  protected toggleFavorite(beer: Beer): void {
    this.onToggleFavorite.emit(beer);
  }

  protected moreDetails(beer: Beer): void {
    this.onMoreDetails.emit(beer);
  }

  protected pageChange(event: PageEvent): void {
    this.onPageChange.emit(event.pageIndex);
  }
}
