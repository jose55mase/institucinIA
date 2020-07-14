import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';
import { EventsComponent } from './components/events.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { RouterModule } from '@angular/router';
import { EventsRoutes } from './events.routing';



@NgModule({
  declarations: [ EventsComponent,ListComponent, AddComponent ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,
    RouterModule.forChild(EventsRoutes),

  ],
  entryComponents:[],
})
export class EventsModule { }
