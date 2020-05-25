import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';
import { CountriesComponent } from './components/countries.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { EstatusActivityPipe } from 'app/pipes/estatus-activity.pipe';
import { EstatusActivityGrupoPipe } from 'app/pipes/estatus-activityGrupo.pipe';




@NgModule({
  declarations: [CountriesComponent,ListComponent,AddComponent , EstatusActivityPipe,EstatusActivityGrupoPipe ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,
    FileUploadModule,
    FormsModule,
    
  ],
  entryComponents:[],
})
export class CountriesModule { }
