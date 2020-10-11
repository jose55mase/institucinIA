import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';

import { OverviewComponent } from 'app/overview/components/overview/overview.component';
import { PurchasesComponent } from 'app/purchases/components/purhases/purchases.component';
import { CountriesComponent } from 'app/moduleCountries/components/countries.component';
import { ClientComponent } from 'app/moduleClient/components/client.component';
import { SubjectsComponent } from 'app/moduleNote/components/subjects/subjects.component';
import { AsignatureComponent } from 'app/moduleAsignature/components/asignature.component'
import { UsersComponent } from 'app/moduleUsers/components/users.component'
import { EventsComponent } from 'app/moduleEventes/components/events.component';
import { QuestionComponent } from 'app/overview/components/questions/question.component';
import { PageNoFoundComponent } from 'app/components/page-no-found/page-no-found.component';


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
        path: 'activity',
        component: CountriesComponent,
        children: [{
            path: 'activity',
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
    {
        path: 'users',
        component: UsersComponent,
        children: [{
            path: 'users',
            loadChildren: () => import('../../moduleUsers/users.module').then(m => m.UsersModule)
        }],
    },
    {
        path: 'events',
        component: EventsComponent,
        children: [{
            path: 'events',
            loadChildren: () => import('../../moduleEventes/events.module').then(m => m.EventsModule)
        }],
    },
    {
        path: 'logs',
        component: QuestionComponent,
        children: [{
            path: 'logs',
            loadChildren: () => import('../../overview/overview.module').then(m => m.OverviewModule)
        }],
    },
    
];
