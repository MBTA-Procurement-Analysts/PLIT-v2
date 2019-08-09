import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PoComponent } from './po/po.component';
import { ReqDetailsComponent } from './req-details/req-details.component';
import { BidComponent } from './bid/bid.component';
import { BidDetailsComponent } from './bid-details/bid-details.component';
import { PoDetailsComponent } from './po-details/po-details.component';
import { WorklistComponent } from './worklist/worklist.component';
import { ReqComponent } from './req/req.component';
import { TicketComponent } from './ticket/ticket.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'dashboard/reqs', pathMatch: 'full', canActivate: [RoleGuard] },
  { path: 'dashboard/reqs', component: DashboardComponent, canActivate: [RoleGuard] },
  { path: 'dashboard/pos', component: PoComponent, canActivate: [RoleGuard] },
  { path: 'self-service', redirectTo: 'self-service/bids', pathMatch: 'full', canActivate: [RoleGuard] },
  { path: 'self-service/bids', component: BidComponent, canActivate: [RoleGuard] },
  { path: 'self-service/ticket', component: TicketComponent, canActivate: [RoleGuard] },
  { path: 'dashboard/reqs/:id/:unit', component: ReqDetailsComponent, canActivate: [RoleGuard] },
  { path: 'self-service/bids/:id', component: BidDetailsComponent, canActivate: [RoleGuard] },
  { path: 'dashboard/pos/:id', component: PoDetailsComponent, canActivate: [RoleGuard] },
  { path: 'dashboard/reqs/:id/:unit/worklist', component: WorklistComponent },
  { path: 'dashboard/admin', component: ReqComponent, canActivate: [AuthGuard] },
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
