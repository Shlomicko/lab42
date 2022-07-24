import {Injectable} from '@angular/core';
import {Beer} from "../models";
import {EMPTY, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private static readonly FAVORITES: string = 'favorites';

  constructor() {
  }

  public saveFavorites(beers: Beer[]): Observable<Beer[]> {
    localStorage.setItem(LocalStorageService.FAVORITES, JSON.stringify(beers));
    return this.getFavorites();
  }

  public getFavorites(): Observable<Beer[]> {
    const data: string | null = localStorage.getItem(LocalStorageService.FAVORITES);
    let favorites: Beer[] = [];
    if (data) {
      favorites = JSON.parse(data) as Beer[]
    }
    return of(favorites);
  }

  public removeAll(): Observable<Beer[]>{
    localStorage.clear();
    return EMPTY;
  }
}
