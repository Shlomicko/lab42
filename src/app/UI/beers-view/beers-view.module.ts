import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeersViewComponent } from './beers-view.component';
import {BeerCardModule} from "../beer-card/beer-card.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [
    BeersViewComponent
  ],
  exports: [
    BeersViewComponent
  ],
  imports: [
    CommonModule,
    BeerCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class BeersViewModule { }
