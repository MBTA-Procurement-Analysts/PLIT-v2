import { Component, OnInit } from '@angular/core';
import { Req, Worklist } from '../models/req';
import { TimelineService} from '../services/timeline.service';
import { ActivatedRoute } from '@angular/router';
import { Timeline, TimelineEvent} from '../models/timeline';
declare var require: any
var vis = require('vis-timeline');

@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.css']
})
export class WorklistComponent implements OnInit {
  req: Req;
  timeline: Timeline;
  items: any[];

//   items = new vis.DataSet([
//   {id: 1, content: 'item 1', start: '2014-04-20', group: 1},
//   {id: 2, content: 'item 2', start: '2014-04-14', group: 2},
//   {id: 3, content: 'item 3', start: '2014-04-18', group: 3},
//   {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
//   {id: 5, content: 'item 5', start: '2014-04-25'},
//   {id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
// ]);

groups = [
  {id: 1, content: 'INTERNAL', style: 'background-color: #98FB98; font-weight: bold'},
  {id: 2, content: 'NEUTRAL', style: 'background-color: #fdfd85; font-weight: bold'},
  {id: 3, content: 'EXTERNAL', style: 'background-color: #ff7777; font-weight: bold'}
]
options = {
  width: '100%',
  maxHeight: '700px',
  // margin: {
  //   item: 20
  // }
};

  constructor(
    private route: ActivatedRoute,
    private timelineService: TimelineService
  ) {
  }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.getWorklist();
  }

  createTimeline() {
    var container = document.getElementById('timeline');
    var events = [];
    this.timeline[0].events.forEach((event: TimelineEvent , index: Number) => {
      let groupNumber: Number;
      if(event.Internal === true && event.Neutral === true) {
        groupNumber = 2;
      } else if(event.Internal === false) {
        groupNumber = 3;
      } else if(event.Internal === true && event.Neutral === false) {
        groupNumber = 1;
      }
      events.push({
        id: index,
        content: event.EventType,
        start: event.Start_DTTM,
        end: event.End_DTTM,
        group: groupNumber
      })
    })
    var items = new vis.DataSet(events);
    new vis.Timeline(container, items, this.options, this.groups);
  }

  getWorklist() {
    const id = this.route.snapshot.paramMap.get('id');
    const unit = this.route.snapshot.paramMap.get('unit')
    this.timelineService.getbyReq(id, unit).subscribe(
      tl => {
        this.timeline = tl;
        console.log(this.timeline);
        this.createTimeline();
      }
    )
  }
}
