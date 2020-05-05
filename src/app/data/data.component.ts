import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  private confirmed(): string {
    if (this._confirmed == -1)
      return "...";
    return this._confirmed.toString();
  }

  private recovered(): string {
    if (this._recovered == -1)
      return "...";
    return this._recovered.toString();
  }

  private critical(): string {
    if (this._critical == -1)
      return "...";
    return this._critical.toString();
  }

  private deaths(): string {
    if (this._deaths == -1)
      return "...";
    return this._deaths.toString();
  }

  constructor(private route: ActivatedRoute) {
    this._country = this.route.snapshot.paramMap.get('country');
    if (this._country !== null)
      console.log("Display data for country " + this._country);
    else
      console.log("Display data for the entire world");

    this._confirmed = -1;
    this._recovered = -1;
    this._critical = -1;
    this._deaths = -1;

  }

  ngOnInit() {
  }

}
