import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FoodPairingComponent} from './food-pairing.component';
import {FoodPairingRoutingModule} from './food-pairing-routing.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromBeers from '../../state/beer-gallery/beer.reducers'
import {BeerEffects} from '../../state/beer-gallery/beer.effects';
import {QueryBoxModule} from '../../UI/query-box/query-box.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BeersViewModule} from '../../UI/beers-view/beers-view.module';


@NgModule({
  declarations: [
    FoodPairingComponent
  ],
  imports: [
    CommonModule,
    FoodPairingRoutingModule,
    StoreModule.forFeature(fromBeers.beerFeatureKey, fromBeers.reducer),
    EffectsModule.forFeature([BeerEffects]),
    QueryBoxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    BeersViewModule,
    MatFormFieldModule,
  ]
})
export class FoodPairingModule { }
