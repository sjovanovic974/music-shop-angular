import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopFormService {
  constructor() {}

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
