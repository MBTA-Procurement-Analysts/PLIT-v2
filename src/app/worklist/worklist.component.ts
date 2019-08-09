import { Component, OnInit } from '@angular/core';
import { Req, Worklist } from '../models/req';
import { ReqService } from '../services/req.service';
import { TimelineService} from '../services/timeline.service';
import { ActivatedRoute } from '@angular/router';
import { Timeline, TimelineEvent} from '../models/timeline';

@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.css']
})
export class WorklistComponent implements OnInit {
  req: Req;
  timeline: Timeline;

  constructor(
    private route: ActivatedRoute,
    private timelineService: TimelineService
  ) { }

  ngOnInit() {
    this.getWorklist();
  }

  getWorklist() {
    const id = this.route.snapshot.paramMap.get('id');
    this.timelineService.getbyReq(id).subscribe(
      tl => {
        this.timeline = tl;
        console.log(this.timeline);
      }
    )
  }
}
