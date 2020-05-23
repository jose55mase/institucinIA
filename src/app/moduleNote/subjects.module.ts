import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ListComponent } from './components/service-list/list.component';
import { ServiceCreateComponent } from './components/service-create/service-create'
import { EstatusProductPipe } from 'app/pipes/estatus-product.pipe';


@NgModule({
  declarations: [ ServiceCreateComponent,SubjectsComponent, ListComponent,EstatusProductPipe ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,
    
  ],
  entryComponents:[],
})
export class SubjectsModule { }
