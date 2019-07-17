import { Component, OnInit } from '@angular/core';
import { ReqService } from '../services/req.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Req, Lines } from '../models/req';

@Component({
  selector: 'app-req-details',
  templateUrl: './req-details.component.html',
  styleUrls: ['./req-details.component.css']
})
export class ReqDetailsComponent implements OnInit {
  req: Req;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private reqService: ReqService
  ) {}

  ngOnInit() {
    this.getReq()
  }

  getReq() {
    const id = this.route.snapshot.paramMap.get('id');
    this.reqService.getReq(id)
    .subscribe(
      req => {
        this.req = req[0];
        console.log(this.req);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  addLines(lines: Lines) {
    let sum = 0;
    for (let line in lines) {
      sum += lines[line].Line_Total;
    }
    return sum;
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
