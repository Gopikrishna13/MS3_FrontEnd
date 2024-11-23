import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { LocationMapComponent } from './location-map/location-map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { BikeComponentComponent } from './bike-component/bike-component.component';
import { BikeComponent } from './bike/bike.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationMapComponent,
    //BikeComponentComponent,
    BikeComponent, 
    DashboardComponent
  ],
  imports: [
    BrowserModule,        
    AppRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule        
  ],
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
