import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material/app-material.module';

import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { PlotlyViaCDNModule } from 'angular-plotly.js';

import { HttpClientModule } from '@angular/common/http';


PlotlyViaCDNModule.plotlyVersion = '1.49.4'; // can be `latest` or any version number (i.e.: '1.40.0')
// tslint:disable-next-line: max-line-length
PlotlyViaCDNModule.plotlyBundle = 'basic'; // optional: can be null (for full) or 'basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox' or 'finance'



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PlotlyViaCDNModule,
    //PlotlyModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
