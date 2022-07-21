import {NgModule} from '@angular/core';
import {QueryBoxComponent} from "./query-box.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    QueryBoxComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule
  ],
  exports: [
    QueryBoxComponent
  ]
})
export class QueryBoxModule { }
