import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'beer-selection',
    loadChildren: () => import('./pages/beers-selection/beers-selection.module').then(m => m.BeersSelectionModule)
  },
  {
    path: 'food-pairing',
    loadChildren: () => import('./pages/food-pairing/food-pairing.module').then(m => m.FoodPairingModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesModule)
  },
  {
    path: '',
    redirectTo: 'beer-selection',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
