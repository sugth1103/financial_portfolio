import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateInvestmentDetailComponent } from './create-investment-detail/create-investment-detail.component';
import { ErrorComponentComponent } from './error-component/error-component.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'createInvestment', component: CreateInvestmentDetailComponent },
    {path: 'error', component: ErrorComponentComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
  ];
