import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TableComponent } from './components/table/table.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
        canActivate: [AuthGuard],
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About page',
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login page',
        canActivate: [NotAuthGuard],
    },
    {
        path: 'table',
        component: TableComponent,
        title: 'Table page',
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: '',
    },
];
