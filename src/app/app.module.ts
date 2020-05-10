import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import { TweetComponent } from './tweet/tweet.component';
import { DataComponent } from './data/data.component';
import { Routes, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToasterComponent } from './toaster/toaster.component';
import { CheckForUpdateService } from './services/check-for-update-service.service';
import { HttpClientModule } from '@angular/common/http'; 

import { CountriesMapModule } from 'countries-map';

const appRoutes: Routes = [
  { path: '', component: DataComponent },
  { path: 'data', component: DataComponent },
  { path: 'data/:country', component: DataComponent },
  { path: 'map', component: MapComponent },
  { path: 'tweets', component: TweetComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TweetComponent,
    DataComponent,
    ToasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    CountriesMapModule
  ],
  providers: [CheckForUpdateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
