import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { OverviewModule } from 'app/overview/overview.module';

import { RouterModule } from '@angular/router';
import { ChatboxComponent } from './chatbox.component';


@NgModule({
  declarations: [ ChatboxComponent ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    OverviewModule,
   

  ],
  entryComponents:[ ChatboxComponent ],
  
})
export class ChatModule { }
