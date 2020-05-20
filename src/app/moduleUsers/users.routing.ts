import { Routes } from '@angular/router';
import { EstudentsComponent } from './components/estudents/estudents.component';
import { AddComponent } from './components/add/add.component';



export const UserRoutes: Routes = [
    { path: 'estudent',   component: EstudentsComponent },
    { path: 'createUser', component:AddComponent }
];

