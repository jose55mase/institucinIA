import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';
import { CountriesComponent } from './components/countries.component';
import { ListComponent } from './components/list/list.component';
import { EstatusCountriesPipe } from 'app/pipes/estatus-countries.pipe';
import { AddComponent } from './components/add/add.component';



@NgModule({
  declarations: [CountriesComponent,ListComponent,AddComponent , EstatusCountriesPipe ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,
    
    
  ],
  entryComponents:[],
})
export class CountriesModule { }
