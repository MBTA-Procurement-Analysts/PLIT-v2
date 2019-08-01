import { Component, OnInit, ViewChild } from '@angular/core';
import { Po } from '../models/po';
import { PoService } from '../services/po.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class PoComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public dataSource: any;

  tempPos: Po[];
  pos: Po[];
  user: User;

  displayedColumns: string[] = [
    'Business Unit',
    'Po No',
    'Po Date',
    'Vendor',
    'FMIS'
  ];

  constructor(
    private poService: PoService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getPos();
    });
    this.getPos();
  }

  getPos(): void {
    this.authService.globalCurrentUser.subscribe(user => this.user = user);
    this.poService.getPos()
    .subscribe(
      pos => {
        this.pos = [];
        this.tempPos = pos;
        this.tempPos.map(po => {
          if(po.Buyer === this.user.username.toUpperCase()) {
            this.pos.push(po);
          }
        })
        this.dataSource = this.pos;
        this.dataSource.paginator = this.paginator;
        this.totalSize = this.pos.length;
        this.iterator();
        console.log(this.pos);
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
    const part = this.pos.slice(start, end);
    this.dataSource = part;
  }
}
