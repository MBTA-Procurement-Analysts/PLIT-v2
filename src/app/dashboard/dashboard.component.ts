import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Dashboard } from '../models/dashboard';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ReqService } from '../services/req.service';
import { Req } from '../models/req';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = [
    'color',
    'Business Unit',
    'Req ID'
    // 'Vendor'
  ];
  allReqs: Dashboard[];
  allReqInfo: Req[];
  actionReqs: Dashboard[];
  holdReqs: Dashboard[];
  transmissionReqs: Dashboard[];
  tempReq: Dashboard;
  reqsArrayLength = 0;
  currentUser: User;

  actionColor = 'green';
  holdColor = 'yellow';
  transmissionColor = 'red';

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private reqService: ReqService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.authService.globalCurrentUser.subscribe(user => this.currentUser = user);
      this.getDashboard(this.currentUser.username.toUpperCase())
    });
    this.authService.globalCurrentUser.subscribe(user => this.currentUser = user);
    this.getDashboard(this.currentUser.username.toUpperCase());
  }

  getDashboard(user: string) {
    this.dashboardService.getDashboard(user)
    .subscribe(
      (reqs: Dashboard[]) => {
        this.allReqs = reqs;
        this.reqsArrayLength = reqs.length;
        this.transmissionReqs = [];
        this.holdReqs = [];
        this.actionReqs = [];

        for(var i = 0; i < this.reqsArrayLength; i++) {
          this.tempReq = {
            _id: this.allReqs[i]._id,
            REQ_No: this.allReqs[i].REQ_No,
            Business_Unit: this.allReqs[i].Business_Unit,
            Buyer: this.allReqs[i].Buyer,
            Req_ID: this.allReqs[i].Req_ID,
            Hold_From_Further_Processing: this.allReqs[i].Hold_From_Further_Processing,
            Hold_Status: this.allReqs[i].Hold_Status,
            Sourcing: this.allReqs[i].Sourcing,
            Lines_Not_Sourced: this.allReqs[i].Lines_Not_Sourced,
            Out_To_Bid: this.allReqs[i].Out_To_Bid,
            Transmitted: this.allReqs[i].Transmitted,
            Transmitted_Time: this.allReqs[i].Transmitted_Time,
            Req_Info: null
          };
          if(this.tempReq.Transmitted === 'Y') {
            this.transmissionReqs.push(this.tempReq);
          } else if(this.tempReq.Hold_From_Further_Processing === 'Y') {
            this.holdReqs.push(this.tempReq);
          } else {
            this.actionReqs.push(this.tempReq);
          };
        }
      }
    );
  }
}
