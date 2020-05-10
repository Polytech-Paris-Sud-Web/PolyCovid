import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PolyCovid';

  search:string;
  is_search: boolean = false;

  public searchCountry(){
    this.search = document.getElementById("search_input")['value'];
    this.is_search = this.search!="";
  }

  onChoosenCountry(country: string) {
    document.getElementById("search_input")["value"]="";
    window.location.replace("/data/"+country)
  }
}
