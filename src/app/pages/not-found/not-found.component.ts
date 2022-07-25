import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {BeersStateService} from "../../core/services/beers-state.service";
import {Beer} from "../../core/models";
import {Observable} from "rxjs";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements AfterViewInit {

  protected beer$: Observable<Beer | undefined> = this.beersState.randomBeer$;

  constructor(private beersState: BeersStateService) {
  }

  ngAfterViewInit(): void {
    this.beersState.fetchRandoBeer();
  }

  protected brokenImageError(event: ErrorEvent): void {
    (event.target as HTMLImageElement).src = 'assets/beer-bottle.svg';
  }


}
