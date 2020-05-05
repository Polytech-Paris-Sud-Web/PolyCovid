import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import data from './latesttotal.json';
import { SwUpdate } from '@angular/service-worker';
import { CheckForUpdateService } from '../services/check-for-update-service.service';
//TODO: use file in cache

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {

  private _country: string;
  private _confirmed: number;
  private _recovered: number;
  private _critical: number;
  private _deaths: number;
  updateAvailable = false;

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

  private load_data(country: string): void {
    if (country == null)
    {
      console.log(data);
      this._confirmed = data[0]["confirmed"];
      this._recovered = data[0]['recovered'];
      this._critical = data[0]['active'];
      this._deaths = data[0]['deaths'];
    }
  }

  // constructor(private route: ActivatedRoute, private swUpdate: SwUpdate) {
  // }
  constructor(private route: ActivatedRoute, private swUpdate: SwUpdate,
    private checkForUpdateService: CheckForUpdateService) {
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


    this._country = this.route.snapshot.paramMap.get('country');
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

}
