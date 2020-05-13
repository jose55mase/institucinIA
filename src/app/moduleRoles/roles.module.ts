import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';
import { RolesComponent } from './components/roles.component';
import { ListComponent } from './components/list/list.component';
import { EstatusRolesPipe } from 'app/pipes/estatus-roles.pipe';
import { AddComponent } from 'app/moduleRoles/components/add/add.component'


@NgModule({
  declarations: [RolesComponent,ListComponent, AddComponent,EstatusRolesPipe ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,
    
  ],
  entryComponents:[],
})
export class RolesModule { }
