import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataRetrievalService {

  private _totals: Object;
  private _countries_data: any; //Object[]

  constructor(public httpClient: HttpClient) {
    this._totals = [{ confirmed: -1, recovered: -1, critical: -1 }]
    this.updateTotals();
    this.updateCountriesData();
  }

  private updateTotals(): void {
    console.log("updateTotals");
    this.httpClient.get('https://covid19-api.com/totals?format=json').subscribe((res) => {
      this._totals = res;
      console.log(res);
    });
  }

  private async updateCountriesData(): Promise<void> {
    console.log("updateCountriesData  ");
    await this.httpClient.get('https://covid19-api.com/country/all?format=json').subscribe((res) => {
      this._countries_data = res;
      console.log(res);
    });
  }

  public totals(): Object { return this._totals; }

  public countries_data(): Object[] { return this._countries_data; }

  public country_data(country: string): Object {
    if (this._countries_data != undefined) {
      for (let index = 0; index < this._countries_data.length; index++) {
        const c = this._countries_data[index];
        if (country.toUpperCase() === c['country'].toUpperCase()) {
          console.log("found " + country);
          return c;
        }
      }
      return this._totals;
    } //else
    //console.warn("_countries_data is undefined");
    return this._totals;
  }

}
