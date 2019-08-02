import { Component, OnInit } from '@angular/core';
import { Req, Worklist } from '../models/req';
import { ReqService } from '../services/req.service';
import { ActivatedRoute } from '@angular/router';
import { TimelineEvent } from '../models/timeline_event'

@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.css']
})
export class WorklistComponent implements OnInit {
  req: Req;
  worklist: Worklist;
  tomorrow = new Date(2017, 9, 20, 14,34);
  events: TimelineEvent;

  constructor(
    private reqService: ReqService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getWorklist();
  }

  getWorklist() {
    const id = this.route.snapshot.paramMap.get('id');
    this.reqService.getReq(id).subscribe(
      req => {
        this.req = req;
        this.worklist = req[0].worklist;
        console.log(this.worklist);
      }
    )
  }

}
