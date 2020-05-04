import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    // Permet de recharger la timeline twitter
    (<any>window).twttr.widgets.load();
  }
}
