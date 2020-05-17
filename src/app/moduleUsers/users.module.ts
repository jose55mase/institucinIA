import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';
import { UsersComponent } from './components/users.component';
//import { EstatusRolesPipe } from 'app/pipes/estatus-roles.pipe';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,
    
  ],
  entryComponents:[],
})
export class UsersModule { }
