import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';

import { OverviewComponent } from 'app/overview/components/overview/overview.component';
import { PurchasesComponent } from 'app/purchases/components/purhases/purchases.component';
import { CountriesComponent } from 'app/moduleCountries/components/countries.component';
import { RolesComponent } from 'app/moduleRoles/components/roles.component'
import { ClientComponent } from 'app/moduleClient/components/client.component';
import { SubjectsComponent } from 'app/moduleNote/components/subjects/subjects.component';
 
export const AdminLayoutRoutes: Routes = [
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'notifications',  component: NotificationsComponent },    
    {
        path: 'overview',
        component: OverviewComponent,
        children: [{
            path: 'overview',
            loadChildren: () => import('../../overview/overview.module').then(m => m.OverviewModule)
        }],
    },
    {
        path: 'purchases',
        component: PurchasesComponent,
        children: [{
            path: 'purchases',
            loadChildren: () => import('../../overview/overview.module').then(m => m.OverviewModule)
        }],
    },
    {
        path: 'subjects',
        component: SubjectsComponent,
        children: [{
            path: 'subjects',
            loadChildren: () => import('../../moduleNote/subjects.module').then(m => m.SubjectsModule)
        }],
    },
    {
        path: 'countries',
        component: CountriesComponent,
        children: [{
            path: 'countries',
            loadChildren: () => import('../../moduleCountries/service.module').then(m => m.CountriesModule)
        }],
    },
    {
        path: 'roles',
        component: RolesComponent,
        children: [{
            path: 'roles',
            loadChildren: () => import('../../moduleRoles/roles.module').then(m => m.RolesModule)
        }],
    },
    {
        path: 'client',
        component: ClientComponent,
        children: [{
            path: 'client',
            loadChildren: () => import('../../moduleClient/client.module').then(m => m.ClientModule)
        }],
    },
];

