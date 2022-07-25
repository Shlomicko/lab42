import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BeersSelectionComponent} from './beers-selection.component';
import {BeersViewModule} from "../../UI/beers-view/beers-view.module";
import {StoreModule} from "@ngrx/store";
import * as fromBeers from "../../state/beer-gallery/beer.reducers";
import {EffectsModule} from "@ngrx/effects";
import {BeerEffects} from "../../state/beer-gallery/beer.effects";
import {BeersSelectionRoutingModule} from "./beers-selection-routing.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    BeersSelectionComponent
  ],
  imports: [
    CommonModule,
    BeersViewModule,
    StoreModule.forFeature(fromBeers.beerFeatureKey, fromBeers.reducer),
    EffectsModule.forFeature([BeerEffects]),
    BeersSelectionRoutingModule,
    MatProgressSpinnerModule
  ],
})
export class BeersSelectionModule {
}
