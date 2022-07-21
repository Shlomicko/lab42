import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerCardComponent } from './beer-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
    declarations: [
        BeerCardComponent
    ],
    exports: [
        BeerCardComponent
    ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class BeerCardModule { }
