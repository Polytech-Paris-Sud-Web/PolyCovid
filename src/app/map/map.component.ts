import { Component, OnInit } from '@angular/core';
import { CountriesData } from 'countries-map';

import { DataRetrievalService } from 'src/app/services/data-retrieval.service';

import CountryCode from '../../assets/countries.json'


interface mapDataAllStatus{
  "confirmed": CountriesData,
  "recovered": CountriesData,
  "critical": CountriesData,
  "deaths": CountriesData
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  mapdata_created: boolean = false;
  mapdata_all_status : mapDataAllStatus;

  public status: string;
  public mapData: CountriesData = {};

  constructor(
    public dataRetrievalService: DataRetrievalService
  ) { }

  ngOnInit() {
    this.updateMapData();
  }

  private updateMapData(){
    this.mapdata_created = false;

    this.mapdata_all_status = {
      confirmed: {},
      recovered: {},
      critical: {},
      deaths: {}
    }

    this.dataRetrievalService.getCountriesData().subscribe(countries_data => {
      countries_data.forEach(element => {
        let alpha2 = this.getAlpha2(element.country);
        this.mapdata_all_status["confirmed"][alpha2] = {value : element['confirmed']};
        this.mapdata_all_status["recovered"][alpha2] = {value : element['recovered']};
        this.mapdata_all_status["critical"][alpha2] = {value : element['critical']};
        this.mapdata_all_status["deaths"][alpha2] = {value : element['deaths']};
      });
      
      this.changeStatus("confirmed");
      this.mapdata_created = true;
    });
    
  }

  private getAlpha2(country: string) : string {
    let alpha2 = null;
    country = country.toUpperCase();
    CountryCode.forEach(c => {
      if (country === c['name'].toUpperCase()){
        alpha2 = c['alpha2code'];
      }
    })
    return alpha2;
  }

  public changeStatus(status : string){
    this.status = status;
    this.mapData = this.mapdata_all_status[status];
  }
}
