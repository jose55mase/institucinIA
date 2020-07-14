import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { HomeComponent } from './home/home.component';
import { ChatModule } from 'app/chatbox/chat.module';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    ChatModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    PageNoFoundComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent
  ],
  entryComponents:[
    
  ]
})
export class ComponentsModule { }
