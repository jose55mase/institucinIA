import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ListComponent, ShowNotasModalComponent } from './components/service-list/list.component';
import { ServiceCreateComponent } from './components/service-create/service-create'
import { EstatusActivityPipe } from 'app/pipes/estatus-activity.pipe';


@NgModule({
  declarations: [ ServiceCreateComponent,SubjectsComponent, ListComponent, ShowNotasModalComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,

    
    
  ],
  entryComponents:[ShowNotasModalComponent],
})
export class SubjectsModule { }
