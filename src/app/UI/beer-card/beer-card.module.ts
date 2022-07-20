import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerCardComponent } from './beer-card.component';
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    BeerCardComponent
  ],
    imports: [
        CommonModule,
        MatCardModule
    ]
})
export class BeerCardModule { }
