import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';
import { RolesComponent } from './components/roles.component';
import { ListComponent } from './components/list/list.component';
import { EstatusCountriesPipe } from 'app/pipes/estatus-countries.pipe';



@NgModule({
  declarations: [RolesComponent,ListComponent,  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,
    
  ],
  entryComponents:[],
})
export class RolesModule { }
