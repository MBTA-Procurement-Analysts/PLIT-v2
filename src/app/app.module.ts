import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

import { AuthService } from './services/auth.service'
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ImpersonationComponent } from './impersonation/impersonation.component';
import { NavComponent } from './nav/nav.component';
import { ReqComponent } from './req/req.component';
import { ReqDetailsComponent } from './req-details/req-details.component';
import { PoComponent } from './po/po.component';
import { BidComponent } from './bid/bid.component';
import { BidDetailsComponent } from './bid-details/bid-details.component';

import { SearchPipe } from './pipes/search.pipe';
import { PoDetailsComponent } from './po-details/po-details.component';
import { WorklistComponent } from './worklist/worklist.component';
import { TicketComponent } from './ticket/ticket.component';
import { ReqPrintingComponent } from './req-printing/req-printing.component';
import { ReqstatusPipe } from './pipes/reqstatus.pipe';
import { ItemstatusPipe } from './pipes/itemstatus.pipe';
import { OrderByPipe } from './pipes/orderby.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ImpersonationComponent,
    NavComponent,
    ReqComponent,
    ReqDetailsComponent,
    PoComponent,
    BidComponent,
    BidDetailsComponent,
    SearchPipe,
    PoDetailsComponent,
    WorklistComponent,
    TicketComponent,
    ReqPrintingComponent,
    ReqstatusPipe,
    ItemstatusPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSidenavModule,
    MatGridListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatChipsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDividerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule
  ],
  exports: [
    MatPaginatorModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    DashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
