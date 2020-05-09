import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRetrievalService {
  constructor(
    public httpClient: HttpClient
  ) {}

  getTotals() : Observable<any> {
    return this.httpClient.get('https://covid19-api.com/totals?format=json')
  }
  
  getCountriesData() : Observable<any>{
    return this.httpClient.get('https://covid19-api.com/country/all?format=json')
  }
}
