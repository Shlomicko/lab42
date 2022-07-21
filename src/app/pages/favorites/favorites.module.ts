import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import {FavoritesRoutingModule} from "./favorites-routing.module";
import {BeerCardModule} from "../../UI/beer-card/beer-card.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    BeerCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class FavoritesModule { }
