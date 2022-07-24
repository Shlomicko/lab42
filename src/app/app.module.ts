import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {NavBarModule} from './UI/nav-bar/nav-bar.module';
import {HttpClientModule} from '@angular/common/http';
import * as fromFavoritesBeers from './state/favorites/favorites.reducers';
import {FavoritesEffects} from './state/favorites/favorites.effects';
import {MoreBeerInfoDialogComponent} from "./UI/beer-info-dialog/more-beer-info-dialog.component";
import { AlertDialogComponent } from './UI/remove-favorite-alert/alert-dialog.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({favorites: fromFavoritesBeers.reducer}),
    EffectsModule.forRoot([FavoritesEffects]),
    NavBarModule,
    MatSnackBarModule,
    MoreBeerInfoDialogComponent,
    AlertDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
