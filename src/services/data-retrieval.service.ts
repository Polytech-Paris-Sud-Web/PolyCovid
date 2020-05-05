import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataRetrievalService {

  private _totals: Object;
  private _countries_data: Object;

  public totals() { return this._totals; }
  public countries_data() { return this._countries_data; }

  constructor(public httpClient: HttpClient) {
    this._totals = [{ confirmed: -1, recovered: -1, critical: -1}]
    this.updateTotals();
    this.updateCountriesData();
  }

  updateTotals() {
    console.log("updateTotals updateTotals updateTotals");
    this.httpClient.get('https://covid19-api.com/totals?format=json').subscribe((res) => {
      this._totals = res;
      console.log(res);
    });
  }

  updateCountriesData() {
    console.log("updateCountriesData updateCountriesDataupdateCountriesData updateCountriesData");
    this.httpClient.get('https://covid19-api.com/country/all?format=json').subscribe((res) => {
      this._countries_data = res;
      console.log(res);
    });
  }
}
