import { Component, OnInit } from '@angular/core';
import { Po } from '../models/po';
import { PoService } from '../services/po.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class PoComponent implements OnInit {
  pos: Po[];
  displayedColumns: string[] = [
    'Business Unit',
    'Po No',
    'Po Date',
    'Vendor'
  ];

  constructor(
    private poService: PoService,
    private router: Router
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
    this.poService.getPos()
    .subscribe(
      pos => {
        this.pos = pos;
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
}
