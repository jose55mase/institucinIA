import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';

import { OverviewComponent } from 'app/overview/components/overview/overview.component';
import { PurchasesComponent } from 'app/purchases/components/purhases/purchases.component';
import { ServiceComponent } from 'app/moduleService/components/service/service.component';
import { CountriesComponent } from 'app/moduleCountries/components/countries.component';
import { AsignatureComponent } from 'app/moduleAsignature/components/asignature.component'
import { ClientComponent } from 'app/moduleClient/components/client.component';
 
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
        path: 'service',
        component: ServiceComponent,
        children: [{
            path: 'service',
            loadChildren: () => import('../../moduleService/service.module').then(m => m.ServiceModule)
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
        path: 'asignature',
        component: AsignatureComponent,
        children: [{
            path: 'asignature',
            loadChildren: () => import('../../moduleAsignature/asignature.module').then(m => m.AsignatureModule)
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

