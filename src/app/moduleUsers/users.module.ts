import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';
import { UsersComponent } from './components/users.component';
import { ListComponent } from './components/list/list.component';
import { EstudentsComponent } from './components/estudents/estudents.component';
import { UserRoutes } from './users.routing';
import { AddComponent } from './components/add/add.component';

 


//import { EstatusRolesPipe } from 'app/pipes/estatus-roles.pipe';


@NgModule({
  declarations: [UsersComponent, AddComponent,ListComponent,EstudentsComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,
    RouterModule.forChild(UserRoutes),
    
  ],
  entryComponents:[],
})
export class UsersModule { }
