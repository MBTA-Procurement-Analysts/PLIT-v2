import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Dashboard, Lines } from '../models/dashboard';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { ReqService } from '../services/req.service';
import { Req } from '../models/req';
import { MatPaginator } from '@angular/material';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public dataSource: any;
  public tempDataSource: any;

  displayedColumns: string[] = [
    'color',
    // 'flag',
    'Business Unit',
    'Req No',
    'Days Since Creation',
    'Days Since Approval',
    'Amount',
    'Requested Vendor',
    'Description',
    'Comments',
    'FMIS'
  ];
  allReqInfo: Dashboard[];
  actionReqs: Dashboard[];
  holdReqs: Dashboard[];
  outToBidReqs: Dashboard[];
  transmissionReqs: Dashboard[];
  tempReq: Dashboard;
  tempInfoReq: Req;
  reqsArrayLength: number;
  currentUser: User;
  reqsLoaded: Promise<boolean>;
  selectedIndex: number;
  sortAmountFlag: number = 0;
  filterBusinessUnitFlag: number = 0;
  sortByCreationFlag: number = 0;
  sortByApprovalFlag: number = 0;

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
      this.selectedIndex = 0;
      this.authService.globalCurrentUser.subscribe(user => this.currentUser = user);
      this.currentPage = 0;
      this.getReqInfo(this.currentUser.username.toUpperCase());
    });
    this.authService.globalCurrentUser.subscribe(user => this.currentUser = user);
    this.getReqInfo(this.currentUser.username.toUpperCase());
  }

  getReqInfo(user: string) {
    this.allReqInfo = [];
    this.transmissionReqs = [];
    this.outToBidReqs = [];
    this.holdReqs = [];
    this.actionReqs = [];
    let counter = 0;
    let flagCounter = 0;
    this.dashboardService.getDashboard(user)
      .pipe(
        switchMap(req => req.map(
          reqInfo => {
            this.tempReq = {
              _id: reqInfo._id,
              REQ_No: reqInfo.REQ_No,
              Business_Unit: reqInfo.Business_Unit,
              Buyer: reqInfo.Buyer,
              Req_ID: reqInfo.Req_ID,
              Hold_From_Further_Processing: reqInfo.Hold_From_Further_Processing,
              Hold_Status: reqInfo.Hold_Status,
              Sourcing: reqInfo.Sourcing,
              Lines_Not_Sourced: reqInfo.Lines_Not_Sourced,
              Out_To_Bid: reqInfo.Out_To_Bid,
              Transmitted: reqInfo.Transmitted,
              Transmitted_Time: reqInfo.Transmitted_Time,
              Req_Info: this.tempInfoReq = {
                _id: null,
                REQ_No: null,
                Account: null,
                Approved_By: null,
                Approved_On: null,
                Business_Unit: null,
                Buyer: null,
                Currency: null,
                Department: null,
                Fund: null,
                Origin: null,
                REQ_Date: null,
                Requester: null,
                Ship_To: null,
                Status: null,
                Vendor: null,
                lines: null,
                User_Notes: null,
                flag: null
              }
            };
            this.allReqInfo.push(this.tempReq);
            return this.reqService.getReq(reqInfo.REQ_No);
          }
        )
      )
    )
    .subscribe(
      reqInfoObservable => {
        reqInfoObservable.subscribe(
          reqInfo => {
            this.allReqInfo[counter].Req_Info = reqInfo[0];
            this.allReqInfo[counter].Req_Info.flag = reqInfo[0].flag;
            if (this.allReqInfo[counter].Transmitted === 'Y') {
              this.transmissionReqs.push(this.allReqInfo[counter]);
            } else if (this.allReqInfo[counter].Hold_From_Further_Processing === 'Y') {
              this.holdReqs.push(this.allReqInfo[counter]);
            } else if (this.allReqInfo[counter].Out_To_Bid === 'Y') {
              this.outToBidReqs.push(this.allReqInfo[counter]);
            } else {
              this.actionReqs.push(this.allReqInfo[counter]);
            };
            if(this.allReqInfo[counter].Req_Info.flag === true) {
              [this.tempDataSource[flagCounter], this.tempDataSource[counter]] = [this.tempDataSource[counter], this.tempDataSource[flagCounter]];
              flagCounter++;
            }
            counter++;
            this.dataSource = this.allReqInfo;
            this.tempDataSource = this.allReqInfo;
            this.dataSource.paginator = this.paginator;
            this.totalSize = this.allReqInfo.length;
            this.iterator();
            this.reqsLoaded = Promise.resolve(true);
          }
        )
      }
    )
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

  changeDataSource(dataSource: MatTabChangeEvent) {
    if (dataSource.index === 0) {
      this.currentPage = 0;
      this.pageSize = 5;
      this.dataSource = this.allReqInfo;
      this.tempDataSource = this.allReqInfo;
      this.totalSize = this.allReqInfo.length;
      this.dataSource.paginator = this.paginator;
      this.iterator();
    } else if (dataSource.index === 1) {
      this.currentPage = 0;
      this.pageSize = 5;
      this.dataSource = this.actionReqs;
      this.tempDataSource = this.actionReqs;
      this.totalSize = this.actionReqs.length;
      this.dataSource.paginator = this.paginator;
      this.iterator();
    } else if (dataSource.index === 2) {
      this.currentPage = 0;
      this.pageSize = 5;
      this.dataSource = this.holdReqs;
      this.tempDataSource = this.holdReqs;
      this.totalSize = this.holdReqs.length;
      this.dataSource.paginator = this.paginator;
      this.iterator();
    } else if (dataSource.index === 3) {
      this.currentPage = 0;
      this.pageSize = 5;
      this.dataSource = this.transmissionReqs;
      this.tempDataSource = this.transmissionReqs;
      this.totalSize = this.transmissionReqs.length;
      this.dataSource.paginator = this.paginator;
      this.iterator();
    } else if (dataSource.index === 4) {
      this.currentPage = 0;
      this.pageSize = 5;
      this.dataSource = this.outToBidReqs;
      this.tempDataSource = this.outToBidReqs;
      this.totalSize = this.outToBidReqs.length;
      this.dataSource.paginator = this.paginator;
      this.iterator();
    }
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.tempDataSource.slice(start, end);
    this.dataSource = part;
  }

  addLines(lines: Lines) {
    let sum = 0;
    for (let line in lines) {
      sum += lines[line].Line_Total;
    }
    return sum;
  }

  sortByAmount() {
    if (this.sortAmountFlag === 0) {
      this.tempDataSource.sort((amountOne: Dashboard, amountTwo: Dashboard) => this.addLines(amountOne.Req_Info.lines) - this.addLines(amountTwo.Req_Info.lines))
      this.iterator();
      this.sortAmountFlag = 1;
      return this.tempDataSource;
    } else {
      this.tempDataSource.sort((amountOne: Dashboard, amountTwo: Dashboard) => this.addLines(amountTwo.Req_Info.lines) - this.addLines(amountOne.Req_Info.lines))
      this.iterator();
      this.sortAmountFlag = 0;
      return this.tempDataSource;
    }
  }

  filterByBusinessUnit(list: Dashboard[]) {
    if(this.filterBusinessUnitFlag === 0){
       this.tempDataSource = list.filter(
        req => req.Business_Unit === 'MBTAC'
      )
      // console.log(list.length);
      this.totalSize = this.tempDataSource.length;
      this.currentPage = 0;
      this.iterator();
      this.filterBusinessUnitFlag = 1
      return list;
    } else if(this.filterBusinessUnitFlag === 1) {
      this.tempDataSource = list.filter(
        req => req.Business_Unit === 'MBTAF'
      )
      this.totalSize = this.tempDataSource.length;
      this.currentPage = 0;
      this.iterator();
      this.filterBusinessUnitFlag = 2;
      return list;
    } else if(this.filterBusinessUnitFlag === 2) {
      this.tempDataSource = list.filter(
        req => req.Business_Unit === 'MBTAN'
      )
      this.totalSize = this.tempDataSource.length;
      this.currentPage = 0;
      this.iterator();
      this.filterBusinessUnitFlag = 3;
      return list;
    } else if(this.filterBusinessUnitFlag === 3) {
      this.tempDataSource = list.filter(
        req => req.Business_Unit === 'MBTAI'
      )
      this.totalSize = this.tempDataSource.length;
      this.currentPage = 0;
      this.iterator();
      this.filterBusinessUnitFlag = 4;
      return list;
    } else {
      this.tempDataSource = list;
      this.totalSize = this.tempDataSource.length;
      this.currentPage = 0;
      this.iterator();
      this.filterBusinessUnitFlag = 0;
      return list;
    }
  }

  sortByCreation() {
    if (this.sortByCreationFlag === 0) {
      this.tempDataSource.sort((amountOne: Dashboard, amountTwo: Dashboard) => this.getDateDifference(amountOne.Req_Info.REQ_Date) - this.getDateDifference(amountTwo.Req_Info.REQ_Date))
      this.iterator();
      this.sortByCreationFlag = 1;
      return this.tempDataSource;
    } else {
      this.tempDataSource.sort((amountOne: Dashboard, amountTwo: Dashboard) => this.getDateDifference(amountTwo.Req_Info.REQ_Date) - this.getDateDifference(amountOne.Req_Info.REQ_Date))
      this.iterator();
      this.sortByCreationFlag = 0;
      return this.tempDataSource;
    }
  }

  sortByApproved() {
    if(this.sortByApprovalFlag === 0) {
      this.tempDataSource.sort((amountOne: Dashboard, amountTwo: Dashboard) => this.getDateDifference(amountOne.Req_Info.Approved_On) - this.getDateDifference(amountTwo.Req_Info.Approved_On))
      this.iterator();
      this.sortByApprovalFlag = 1;
      return this.tempDataSource;
    } else {
      this.tempDataSource.sort((amountOne: Dashboard, amountTwo: Dashboard) => this.getDateDifference(amountTwo.Req_Info.Approved_On) - this.getDateDifference(amountOne.Req_Info.Approved_On))
      this.iterator();
      this.sortByApprovalFlag = 0;
      return this.tempDataSource;
    }
  }

  searchPageSize() {
    this.pageSize = this.totalSize;
    this.currentPage = 0;
    this.iterator();
  }

//NOT FUCNTIONING CORRECTLY
  changeFlag(req: Dashboard) {
    console.log(req.Req_ID);
    if(req.Req_Info.flag === null || req.Req_Info.flag === false) {
      this.addReqFlag(req.Req_ID);
    } else {
      this.removeReqFlag(req.Req_ID);
    }
    this.router.navigate['dashboard/reqs'];
  }

  addReqFlag(req: string) {
    this.reqService.addFlag(req).subscribe();
  }

  removeReqFlag(req: string) {
    this.reqService.removeFlag(req).subscribe();
  }
}
