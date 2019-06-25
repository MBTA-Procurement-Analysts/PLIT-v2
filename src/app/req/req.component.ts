import { Component, OnInit } from '@angular/core';
import { ReqService } from '../services/req.service';
import { Req } from '../models/req';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-req',
  templateUrl: './req.component.html',
  styleUrls: ['./req.component.css']
})
export class ReqComponent implements OnInit {
  displayedColumns: string[] = ['Business Unit', 'Req ID'];
  allReqs: Req[];
  actionReqs: Req[];
  holdReqs: Req[];
  transmissionReqs: Req[];
  tempReq: Req;
  reqsArrayLength = 0;
  currentUser: User;

  constructor(
    private reqService: ReqService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.authService.globalCurrentUser.subscribe(user => this.currentUser = user);
      this.getReqs(this.currentUser.username.toUpperCase());
    });
    this.authService.globalCurrentUser.subscribe(user => this.currentUser = user);
    this.getReqs(this.currentUser.username.toUpperCase());
  }

  getReqs(user: string) {
    this.reqService.getReqs(user)
    .subscribe(
      reqs => {
        this.allReqs = reqs;
        this.reqsArrayLength = reqs.length;
        this.transmissionReqs = [];
        this.holdReqs = [];
        this.actionReqs = [];

        for(var i = 0; i < this.reqsArrayLength; i++) {
          this.tempReq = {
            _id: this.allReqs[i]._id,
            REQ_No: this.allReqs[i].REQ_No,
            Req_ID: this.allReqs[i].Req_ID,
            Business_Unit: this.allReqs[i].Business_Unit,
            Buyer: this.allReqs[i].Buyer,
            Hold_From_Further_Processing: this.allReqs[i].Hold_From_Further_Processing,
            Hold_Status: this.allReqs[i].Hold_Status,
            Sourcing: this.allReqs[i].Sourcing,
            Lines_Not_Sourced: this.allReqs[i].Lines_Not_Sourced,
            Out_To_Bid: this.allReqs[i].Out_To_Bid,
            Transmitted: this.allReqs[i].Transmitted,
            Transmitted_Time: this.allReqs[i].Transmitted_Time
          }

          if(this.tempReq.Transmitted === 'Y') {
            this.transmissionReqs.push(this.tempReq);
          } else if(this.tempReq.Hold_From_Further_Processing === 'Y') {
            this.holdReqs.push(this.tempReq);
          } else {
            this.actionReqs.push(this.tempReq);
          }
        }
      }
    );
  }
}
