import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';
import { ServiceComponent } from './components/service/service.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceCreateComponent } from './components/service-create/service-create'
import { EstatusProductPipe } from 'app/pipes/estatus-product.pipe';


@NgModule({
  declarations: [ ServiceCreateComponent,ServiceComponent, ServiceListComponent,EstatusProductPipe ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,
    
  ],
  entryComponents:[],
})
export class ServiceModule { }
