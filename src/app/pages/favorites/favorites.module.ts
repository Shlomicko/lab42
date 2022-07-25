import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesComponent} from './favorites.component';
import {FavoritesRoutingModule} from "./favorites-routing.module";
import {BeersViewModule} from "../../UI/beers-view/beers-view.module";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    BeersViewModule,
    MatButtonModule
  ]
})
export class FavoritesModule { }
