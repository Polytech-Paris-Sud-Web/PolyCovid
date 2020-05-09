import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { CheckForUpdateService } from '../services/check-for-update-service.service';
import CountryCode from '../../assets/countries.json'

import { DataRetrievalService } from 'src/app/services/data-retrieval.service';

export interface Country{
  name: string;
  alpha2: string;
}

export interface Data{
  confirmed: number;
  recovered: number;
  critical: number;
  deaths: number
}

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {
  totals : Data
  countries_data : {name: string, data: Data}[];
  private updateAvailable = false;

  country: Country;
  data: Data;
  totals_loaded: boolean = false;
  countries_data_loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private swUpdate: SwUpdate,
    private checkForUpdateService: CheckForUpdateService,
    public dataRetrievalService: DataRetrievalService
  ){
    this.updateTotals();
    this.updateCountriesData();
    this.swUpdate.available.subscribe((event) => {
      this.updateAvailable = true;
    });
  }

  ngOnInit() {
    // if (this.swUpdate.isEnabled) {
    //   this.swUpdate.available.subscribe(() => {
    //       if(confirm("New version available. Load New Version?")) {
    //           window.location.reload();
    //       }
    //   });
    // }
    this.country = this.resolve_country(this.route.snapshot.paramMap.get('country'));
    if (this.country){
      this.country_data(this.country.name);
    }
  }

  ngAfterViewInit(): void {
    // Permet de recharger le bouton twitter
    (<any>window).twttr.widgets.load();
  }

  private updateTotals(){
    this.totals_loaded = false;
    this.dataRetrievalService.getTotals().subscribe((data) => {
      this.totals = {
        confirmed : data[0]["confirmed"],
        recovered : data[0]['recovered'],
        critical : data[0]['critical'],
        deaths : data[0]['deaths']
      }
      if(!this.country)this.data = this.totals;
      this.totals_loaded = true;
    });
  }

  private updateCountriesData(){
    this.countries_data_loaded = false;
    this.dataRetrievalService.getCountriesData().subscribe(countries_data => {
      this.countries_data = countries_data.map(element => {
        return {
          name : element['country'],
          data : {
            confirmed : element['confirmed'],
            recovered : element['recovered'],
            critical : element['critical'],
            deaths : element['deaths']
          } as Data
        }
      });
      if(this.country)this.data = this.country_data(this.country.name);
      this.countries_data_loaded = true;
    });
  }

  private resolve_country(str: string) : Country {
    let country = null;
    if(str){
      str = str.toUpperCase();
      CountryCode.forEach(c => {
        if (str === c['name'].toUpperCase() || (c['alpha2code'] !== null && str === c['alpha2code'].toUpperCase()) || (c['alpha3code'] !== null && str === c['alpha3code'].toUpperCase())) {
          country = {
            name : c['name'],
            alpha2 : c['alpha2code'].toLocaleLowerCase()
          }
        }
      })
    }
    return country;
  }

  private country_data(country: string): Data {
    let data : Data;
    if (this.countries_data) {
      this.countries_data.forEach(c => {
        if(c.name.toUpperCase() == country.toUpperCase()){
          data = c.data;
        }
      })
    }
    return data;
  }
}
