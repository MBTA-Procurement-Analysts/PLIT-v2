import { Component, OnInit, ViewChild } from '@angular/core';
import { ReqService } from '../services/req.service';
import { Req } from '../models/req';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-req',
  templateUrl: './req.component.html',
  styleUrls: ['./req.component.css']
})
export class ReqComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public pageSize = 20;
  public currentPage = 0;
  public totalSize = 0;
  public dataSource: any;

  displayedColumns: string[] = [
    'flag',
    'Business Unit',
    'Req No',
    'Days Since Creation',
    'Days Since Approval',
    'Amount',
    'Requested Vendor',
    'Description',
    'FMIS'
  ];
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
        this.dataSource = reqs;
        this.dataSource.paginator = this.paginator;
        this.totalSize = reqs.length;
        this.iterator();

        for(var i = 0; i < this.reqsArrayLength; i++) {
          this.tempReq = {
            _id: this.allReqs[i]._id,
            REQ_No: this.allReqs[i].REQ_No,
            Account: this.allReqs[i].Account,
            Approved_By: this.allReqs[i].Approved_By,
            Approved_On: this.allReqs[i].Approved_On,
            Business_Unit: this.allReqs[i].Business_Unit,
            Buyer: this.allReqs[i].Buyer,
            Currency: this.allReqs[i].Currency,
            Department: this.allReqs[i].Department,
            Fund: this.allReqs[i].Fund,
            Origin: this.allReqs[i].Origin,
            REQ_Date: this.allReqs[i].REQ_Date,
            Requester: this.allReqs[i].Requester,
            Ship_To: this.allReqs[i].Ship_To,
            Status: this.allReqs[i].Status,
            lines: this.allReqs[i].lines,
            User_Notes: this.allReqs[i].User_Notes,
            flag: this.allReqs[i].flag
          }
        }
      }
    );
  }

  getDateDifference(date: Date) {
    var oneDay = 1000 * 60 * 60 * 24;
    var currentDate = new Date().getTime();
    var reqDate = date.toString();
    var reqDate1 = new Date(reqDate).getTime();
    var difference = Math.round(((currentDate - reqDate1) / oneDay));
    return difference;
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.allReqs.slice(start, end);
    this.dataSource = part;
  }
}
