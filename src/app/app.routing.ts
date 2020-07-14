import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNoFoundComponent } from './components/page-no-found/page-no-found.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [{
      path: 'home',
      loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
    }],
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [{
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    }],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  {
    path: '**',
    component: PageNoFoundComponent,
    children: [{
        path: '**',
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
    }],
},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
