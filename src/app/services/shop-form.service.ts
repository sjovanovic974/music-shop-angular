import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class ShopFormService {
  private countriesUrl: string = 'http://localhost:8080/countries';
  private statesUrl: string = 'http://localhost:8080/countries/states';

  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.countriesUrl);
  }

  getStates(theCountryCode: string): Observable<State[]> {
    const searchStatesUrl: string = `${this.statesUrl}?code=${theCountryCode}`;

    return this.httpClient.get<State[]>(searchStatesUrl);
  }

  getCreditCardMonths(theMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let startMonth = theMonth; startMonth <= 12; startMonth++) {
      data.push(startMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
