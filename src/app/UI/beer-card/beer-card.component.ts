import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BeerInfoMinimal} from "../../core/models";

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeerCardComponent implements OnInit {

  @Input() beerInfo!: BeerInfoMinimal;

  constructor() { }

  ngOnInit(): void {
  }

}
