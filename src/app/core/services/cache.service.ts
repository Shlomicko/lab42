import {Injectable} from '@angular/core';
import {PairedBeerData} from "../models";

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private readonly cache: Map<string, PairedBeerData> = new Map<string, PairedBeerData>();

  constructor() {
  }

  public set(key: string, beersData: PairedBeerData): void {
    this.cache.set(key, beersData);
  }

  public get(key: string): PairedBeerData | undefined {
    return this.cache.get(key);
  }
}
