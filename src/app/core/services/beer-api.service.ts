import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Beer} from "../models";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class BeerApiService {

  constructor(private http: HttpClient) {
  }

  public fetchBeers(page: number, per_page: number): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${environment.beersEndpoint}?page=${page}&per_page=${per_page}`);
  }

  public fetchRandomBeer(): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${environment.beersEndpoint}/random`);
  }

  public fetchFoodPairing(food: string, page: number, per_page: number): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${environment.beersEndpoint}?food=${food}&page=${page}&per_page=${per_page}`);
  }
}
