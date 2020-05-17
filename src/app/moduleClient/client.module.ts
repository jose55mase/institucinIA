import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';
import { ClientComponent } from './components/client.component';
import { ListComponent } from './components/list/list.component';
//import { AddComponent } from 'app/moduleClient/components/add/add.component'
import { EstatusClientPipe } from 'app/pipes/estatus-client.pipe';


@NgModule({
  declarations: [ClientComponent, ListComponent, EstatusClientPipe],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,
    
  ],
  entryComponents:[],
})
export class ClientModule { }
