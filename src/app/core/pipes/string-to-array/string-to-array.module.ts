import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringToArrayPipe } from './string-to-array.pipe';



@NgModule({
  declarations: [
    StringToArrayPipe
  ],
  imports: [
    CommonModule
  ]
})
export class StringToArrayModule { }
