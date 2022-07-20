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

  public fetchBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(environment.beersEndpoint);
  }

  public fetchFoodPairing(query: string): Observable<Beer[]>{
    query = query.trim().replace(/\s\s+/g, '_');
    return this.http.get<Beer[]>(`${environment.beersEndpoint}?food=${query}`);
  }
}
