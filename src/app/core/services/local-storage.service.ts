import {Injectable} from '@angular/core';
import {Beer, BeersData, PairedBeerData} from "../models";
import {EMPTY, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private static readonly FAVORITES: string = 'favorites';
  private static readonly ALL_BEERS: string = 'allBeers';
  private static readonly PAIRED_BEERS: string = 'pairedBeers';

  constructor() {
  }

  public saveFavorites(beers: Beer[]): Beer[] {
    localStorage.setItem(LocalStorageService.FAVORITES, JSON.stringify(beers));
    return this.getFavorites();
  }

  public getFavorites(): Beer[] {
    const data: string | null = localStorage.getItem(LocalStorageService.FAVORITES);
    return this.toBeersArray(data);
  }

  public removeAllFavorites(): void {
    localStorage.removeItem(LocalStorageService.FAVORITES);
  }

  public saveAllBeers(beersData: BeersData): BeersData | null {
    localStorage.setItem(LocalStorageService.ALL_BEERS, JSON.stringify(beersData));
    return this.getAllBeers();
  }

  public getAllBeers(): BeersData | null {
    const data: string | null = localStorage.getItem(LocalStorageService.ALL_BEERS);
    if (data) {
      return JSON.parse(data);
      ;
    }
    return null;
  }

  public savePairedBeers(beersData: PairedBeerData): PairedBeerData | null {
    localStorage.setItem(LocalStorageService.PAIRED_BEERS, JSON.stringify(beersData));
    return this.getPairedBeers();
  }

  public getPairedBeers(): PairedBeerData | null {
    const data: string | null = localStorage.getItem(LocalStorageService.PAIRED_BEERS);
    if (data) {
      return JSON.parse(data);
      ;
    }
    return null;
  }

  private toBeersArray(data: string | null): Beer[] {
    return data ? JSON.parse(data) as Beer[] : [];
  }

}
