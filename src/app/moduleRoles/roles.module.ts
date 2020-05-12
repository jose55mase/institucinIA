import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';
import { RolesComponent } from './components/roles.component';
import { ListComponent } from './components/list/list.component';
import { EstatusRolesPipe } from 'app/pipes/estatus-roles.pipe';



@NgModule({
  declarations: [RolesComponent,ListComponent, EstatusRolesPipe ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,
    
  ],
  entryComponents:[],
})
export class RolesModule { }
