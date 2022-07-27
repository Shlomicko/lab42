import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FoodPairingComponent} from "./food-pairing.component";


const routes: Routes = [
  {
    path: '',
    component: FoodPairingComponent
  },
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FoodPairingRoutingModule {
}
