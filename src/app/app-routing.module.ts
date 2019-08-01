import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PoComponent } from './po/po.component';
import { ReqDetailsComponent } from './req-details/req-details.component';
import { BidComponent } from './bid/bid.component';
import { BidDetailsComponent } from './bid-details/bid-details.component';
import { PoDetailsComponent } from './po-details/po-details.component';
import { WorklistComponent } from './worklist/worklist.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'dashboard/reqs', pathMatch: 'full' },
  { path: 'dashboard/reqs', component: DashboardComponent },
  { path: 'dashboard/pos', component: PoComponent },
  { path: 'self-service', redirectTo: 'self-service/bids', pathMatch: 'full' },
  { path: 'self-service/bids', component: BidComponent },
  { path: 'dashboard/reqs/:id', component: ReqDetailsComponent },
  { path: 'self-service/bids/:id', component: BidDetailsComponent },
  { path: 'dashboard/pos/:id', component: PoDetailsComponent },
  { path: 'dashboard/reqs/:id/worklist', component: WorklistComponent },
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
