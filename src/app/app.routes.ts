import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TableComponent } from './components/table/table.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
        //canActivate: [AuthGuard]
    },

    {
        path: 'login',
        component: LoginComponent,
        title: 'Login page',
    },

    {
        path: 'table',
        component: TableComponent,
        title: 'Table page',
    },

    {
        path: '**',
        redirectTo: ''
    }
];
