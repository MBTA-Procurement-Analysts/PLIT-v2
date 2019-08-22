import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Dashboard, Lines } from '../models/dashboard';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, flatMap } from 'rxjs/operators';
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
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public dataSource: any;
  public tempDataSource: any;

  displayedColumns: string[] = [
    'color',
    'flag',
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
  allReqs: Dashboard[];
  actionReqs: Dashboard[];
  holdReqs: Dashboard[];
  outToBidReqs: Dashboard[];
  transmissionReqs: Dashboard[];
  systematicReqs: Dashboard[];
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
  dataLastUpdated: Date;

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
      this.reqsLoaded = Promise.resolve(true);

    });
    this.authService.globalCurrentUser.subscribe(user => this.currentUser = user);
    this.getReqInfo(this.currentUser.username.toUpperCase());
    this.getDataLastUpdated();
    this.reqsLoaded = Promise.resolve(true);
  }

  getDataLastUpdated() {
    this.dashboardService.getUpdatedTime().subscribe(
      time => {
        this.dataLastUpdated = time;
      }
    )
  }

  getReqInfo(user: string) {
    this.allReqs = [];
    this.transmissionReqs = [];
    this.outToBidReqs = [];
    this.holdReqs = [];
    this.actionReqs = [];
    this.dashboardService.getDashboard(user)
    .pipe(
      flatMap(
        reqs => {
          this.allReqs = reqs;
          console.log(this.allReqs);
          this.allReqs.map(
            req => {
              return this.reqService.getReq(req.REQ_No).subscribe(
                reqInfo => {
                  req.Req_Info = reqInfo[0];
                  if(req.Transmitted === 'Y') {
                    this.transmissionReqs.push(req);
                  } else if(req.Hold_From_Further_Processing === 'Y') {
                    this.holdReqs.push(req);
                  } else if(req.Out_To_Bid === 'Y') {
                    this.outToBidReqs.push(req);
                  } else {
                    this.actionReqs.push(req);
                  }
                  for(let i = 0; i < this.allReqs.length; i++) {
                    if(this.allReqs[i].Req_Info.flag === true) {
                      console.log("hit");
                      let flagReq = this.allReqs[i];
                      this.allReqs.splice(i, 1);
                      this.allReqs.unshift(flagReq);
                    }
                  }
                  this.dataSource = this.allReqs;
                  this.tempDataSource = this.allReqs;
                  this.totalSize = this.allReqs.length;
                  this.dataSource.paginator = this.paginator;
                  this.iterator();
                  // this.filterForSystematicFlags(this.allReqs);
                }
              )
            }
          )
          console.log(this.allReqs);
          return this.allReqs;
        }
      )
    ).subscribe()
  }

  getDateDifference(date: Date) {
    if(date != null) {
      var oneDay = 1000 * 60 * 60 * 24;
      var currentDate = new Date().getTime();
      var reqDate = date.toString();
      var reqDate1 = new Date(reqDate).getTime();
      var difference = Math.round(((currentDate - reqDate1) / oneDay));
      return difference;
    }
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  changeDataSource(dataSource: MatTabChangeEvent) {
    if (dataSource.index === 0) {
      for(let i = 0; i < this.allReqs.length; i++) {
        if(this.allReqs[i].Req_Info.flag === true) {
          let flagReq = this.allReqs[i];
          this.allReqs.splice(i, 1);
          this.allReqs.unshift(flagReq);
        }
      }
      this.currentPage = 0;
      this.pageSize = 10;
      this.tempDataSource = this.allReqs;
      this.totalSize = this.allReqs.length;
      this.dataSource.paginator = this.paginator;
      this.iterator();
    } else if (dataSource.index === 1) {
      for(let i = 0; i < this.actionReqs.length; i++) {
        if(this.actionReqs[i].Req_Info.flag === true) {
          let flagReq = this.actionReqs[i];
          this.actionReqs.splice(i, 1);
          this.actionReqs.unshift(flagReq);
        }
      }
      this.currentPage = 0;
      this.pageSize = 10;
      this.tempDataSource = this.actionReqs;
      this.totalSize = this.actionReqs.length;
      this.dataSource.paginator = this.paginator;
      this.iterator();
    } else if (dataSource.index === 2) {
      for(let i = 0; i < this.holdReqs.length; i++) {
        if(this.holdReqs[i].Req_Info.flag === true) {
          let flagReq = this.holdReqs[i];
          this.holdReqs.splice(i, 1);
          this.holdReqs.unshift(flagReq);
        }
      }
      this.currentPage = 0;
      this.pageSize = 10;
      this.tempDataSource = this.holdReqs;
      this.totalSize = this.holdReqs.length;
      this.dataSource.paginator = this.paginator;
      this.iterator();
    } else if (dataSource.index === 3) {
      for(let i = 0; i < this.transmissionReqs.length; i++) {
        if(this.transmissionReqs[i].Req_Info.flag === true) {
          let flagReq = this.transmissionReqs[i];
          this.transmissionReqs.splice(i, 1);
          this.transmissionReqs.unshift(flagReq);
        }
      }
      this.currentPage = 0;
      this.pageSize = 10;
      this.tempDataSource = this.transmissionReqs;
      this.totalSize = this.transmissionReqs.length;
      this.dataSource.paginator = this.paginator;
      this.iterator();
    } else if (dataSource.index === 4) {
      for(let i = 0; i < this.outToBidReqs.length; i++) {
        if(this.outToBidReqs[i].Req_Info.flag === true) {
          let flagReq = this.outToBidReqs[i];
          this.outToBidReqs.splice(i, 1);
          this.outToBidReqs.unshift(flagReq);
        }
      }
      this.currentPage = 0;
      this.pageSize = 10;
      this.tempDataSource = this.outToBidReqs;
      this.totalSize = this.outToBidReqs.length;
      this.dataSource.paginator = this.paginator;
      this.iterator();
    } else if(dataSource.index === 5) {
      for(let i = 0; i < this.systematicReqs.length; i++) {
        if(this.systematicReqs[i].Req_Info.flag === true) {
          let flagReq = this.systematicReqs[i];
          this.systematicReqs.splice(i, 1);
          this.systematicReqs.unshift(flagReq);
        }
      }
      this.currentPage = 0;
      this.pageSize = 10;
      this.tempDataSource = this.systematicReqs;
      this.totalSize = this.systematicReqs.length;
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

  filterForSystematicFlags(dashboard: Dashboard[]) {
    this.systematicReqs = [];
    console.log(dashboard[1]);
    dashboard.forEach( req => {
      console.log(req.Req_Info.lines);
      let reqAmount = this.addLines(req.Req_Info.lines);
      let reqDate = this.getDateDifference(req.Req_Info.REQ_Date);
      if(reqAmount < 50000 && reqDate > 2 && req.Out_To_Bid === 'N' && req.Hold_From_Further_Processing === 'N') {
        this.systematicReqs.push(req);
      } else if(reqAmount > 50000 && reqDate > 7 && req.Out_To_Bid === 'N' && req.Hold_From_Further_Processing === 'N') {
        this.systematicReqs.push(req);
      } else if(reqAmount < 50000 && reqDate > 30 && req.Hold_From_Further_Processing === 'Y') {
        this.systematicReqs.push(req);
      }
    })
    console.log(this.systematicReqs);
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
    this.searchPageSize();
    console.log(req.Req_ID);
    if(req.Req_Info.flag === null || req.Req_Info.flag === false) {
      let counter = 0;
      this.tempDataSource.forEach((reqInArray: Dashboard) => {
        if(req.Req_ID === reqInArray.Req_ID) {
          this.addReqFlag(req.Req_ID);
          this.tempDataSource.splice(counter, 1);
          this.tempDataSource.unshift(reqInArray);
          console.log(this.tempDataSource);
          this.iterator();
        }
        counter++;
      })
    } else if(req.Req_Info.flag === true) {
      let counter = 0;
      this.tempDataSource.forEach((reqInArray: Dashboard) => {
        if(req.Req_ID === reqInArray.Req_ID) {
          this.removeReqFlag(req.Req_ID);
          this.tempDataSource.splice(counter, 1);
          this.tempDataSource.push(reqInArray);
          console.log(this.tempDataSource);
          this.iterator();
        }
        counter++;
      })
    }
  }

  addReqFlag(req: string) {
    this.reqService.addFlag(req).subscribe();
  }

  removeReqFlag(req: string) {
    this.reqService.removeFlag(req).subscribe();
  }
}
