import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  private country: string;

  constructor(private route: ActivatedRoute) {
    this.country = this.route.snapshot.paramMap.get('country');
    if (this.country !== null)
      console.log("Display data for country " + this.country);
    else
      console.log("Display data for the entire world");

  }

  ngOnInit() {
  }

}
