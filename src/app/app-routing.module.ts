import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PoComponent } from './po/po.component';
import { ReqComponent } from './req/req.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'reqs', component: ReqComponent },
    { path: 'po', component: PoComponent }
  ] },
  { path: 'login', component: LoginComponent }
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
