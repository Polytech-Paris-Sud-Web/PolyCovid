import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { CheckForUpdateService } from '../services/check-for-update-service.service';
import CountryCode from '../../assets/countries.json'

import { DataRetrievalService } from 'src/services/data-retrieval.service';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {

  _country: string;
  _country_alpha2: string; //used to get flag
  private _confirmed: number;
  private _recovered: number;
  private _critical: number;
  private _deaths: number;
  private updateAvailable = false;

  confirmed(): string {
    if (this._confirmed == -1 || this._confirmed == null)
      return "...";
    return this._confirmed.toString();
  }

  recovered(): string {
    if (this._recovered == -1 || this._recovered == null)
      return "...";
    return this._recovered.toString();
  }

  critical(): string {
    if (this._critical == -1 || this._critical == null)
      return "...";
    return this._critical.toString();
  }

  deaths(): string {
    if (this._deaths == -1 || this._deaths == null)
      return "...";
    return this._deaths.toString();
  }

  resolve_name(str: string): void {
    this._country = null; //def ret val
    if (str !== null && str !== undefined) {
      str = str.toUpperCase();
      for (let index = 0; index < CountryCode.length; index++) {
        const c = CountryCode[index];
        if (str === c['name'].toUpperCase() || (c['alpha2code'] !== null && str === c['alpha2code'].toUpperCase()) || (c['alpha3code'] !== null && str === c['alpha3code'].toUpperCase())) {
          this._country = c['name'];
          this._country_alpha2 = c['alpha2code'].toLocaleLowerCase();
          console.log(c['alpha2code']);
          break;
        }
      }
    }
  }

  private load_data(country: string): void {
    if (country == null) {
      this._confirmed = this.dataRetrievalService.totals()[0]["confirmed"];
      this._recovered = this.dataRetrievalService.totals()[0]['recovered'];
      this._critical = this.dataRetrievalService.totals()[0]['active'];
      this._deaths = this.dataRetrievalService.totals()[0]['deaths'];
    } else {
      this._confirmed = this.dataRetrievalService.country_data(this._country)[0]["confirmed"];
      this._recovered = this.dataRetrievalService.country_data(this._country)[0]['recovered'];
      this._critical = this.dataRetrievalService.country_data(this._country)[0]['active'];
      this._deaths = this.dataRetrievalService.country_data(this._country)[0]['deaths'];
    }
  }

  constructor(private route: ActivatedRoute, private swUpdate: SwUpdate,
    private checkForUpdateService: CheckForUpdateService, public dataRetrievalService: DataRetrievalService) {
    this.load_data(this._country);
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
    this.resolve_name(this.route.snapshot.paramMap.get('country'));
    if (this._country !== null)
      console.log("Display data for country " + this._country);
    else
      console.log("Display data for the entire world");

    this._confirmed = -1;
    this._recovered = -1;
    this._critical = -1;
    this._deaths = -1;

    this.load_data(this._country);
  }

  ngAfterViewInit(): void {
    // Permet de recharger le bouton twitter
    (<any>window).twttr.widgets.load();
  }

}
