import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Beer} from "../../core/models";

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeerCardComponent {

  @Input() beerInfo!: Beer;

}
