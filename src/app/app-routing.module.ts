import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PoComponent } from './po/po.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', children: [
    { path: 'reqs', component: DashboardComponent },
    { path: 'po', component: PoComponent }
  ] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload'
    })],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
