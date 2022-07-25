import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import {NotFoundRoutingModule} from "./not-found-routing.module";
import {BeerCardModule} from "../../UI/beer-card/beer-card.module";
import {StoreModule} from "@ngrx/store";
import * as fromBeers from "../../state/beer-gallery/beer.reducers";
import {EffectsModule} from "@ngrx/effects";
import {BeerEffects} from "../../state/beer-gallery/beer.effects";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    BeerCardModule,
    StoreModule.forFeature(fromBeers.beerFeatureKey, fromBeers.reducer),
    EffectsModule.forFeature([BeerEffects]),
    MatButtonModule,
  ]
})
export class NotFoundModule { }
