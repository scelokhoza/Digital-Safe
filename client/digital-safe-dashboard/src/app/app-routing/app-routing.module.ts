import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingRoutingModule } from './app-routing-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ItemsComponent } from '../items/items.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'keys', component: ItemsComponent },
  { path: 'passwords', component: ItemsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AppRoutingRoutingModule
  ]
})
export class AppRoutingModule { }