import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyLogoComponent } from './company-logo.component';



@NgModule({
    declarations: [
        CompanyLogoComponent
    ],
    exports: [
        CompanyLogoComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CompanyLogoModule { }
