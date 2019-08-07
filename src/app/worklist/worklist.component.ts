import { Component, OnInit } from '@angular/core';
import { Req, Worklist } from '../models/req';
import { Po, Worklist as PoWorklist } from '../models/po';
import { ReqService } from '../services/req.service';
import { PoService } from '../services/po.service';
import { ActivatedRoute } from '@angular/router';
import { TimelineEvent } from '../models/timeline_event'
import { flatMap, concatMap, map } from 'rxjs/operators'

@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.css']
})
export class WorklistComponent implements OnInit {
  req: Req;
  worklist: Worklist;
  tomorrow = new Date(2017, 9, 20, 14,34);
  events: TimelineEvent[];
  poNums: string[];
  po: Po[]; 

  constructor(
    private reqService: ReqService,
    private route: ActivatedRoute,
    private poService: PoService,
  ) { }

  ngOnInit() {
    this.getWorklist()
  }

  getPoNumsFromReq(req): string[] {
    console.log(req)
    let result = new Set<string>();
    for (let line of req["lines"]) {
      if (line["PO"]["PO_Number"]) {
        result.add(line["PO"]["PO_Number"])
      }
    }
    if (result.size> 1) {
      console.log("Multiple POs in one REQ!")
    }
    return Array.from(result.values()); 
  }
  
  getPo(poNum) {
    this.poService.getPo(poNum).subscribe(
      po => {
        this.po = po[0];
      }
    )
  }

  getWorklist() {
    const id = this.route.snapshot.paramMap.get('id');
    this.reqService.getReq(id).pipe(
      flatMap(
        req => {
          this.req = req;
          this.worklist = req[0].worklist;
          var poNums = this.getPoNumsFromReq(req[0])
          this.poNums = poNums
          return poNums 
        }
      ),
      flatMap(poNums => this.poService.getPo(poNums)),
      map(po => {
        this.po = po[0]
      })
    ).subscribe(
      result => {
        this.events = this.toTimelineEvents(this.req, this.worklist, this.po);
      }
    )
    console.log(this)
  }

  toTimelineEvents(req, reqWorklist, po): TimelineEvent[] {
    var eventsarr = []
    console.log(req, reqWorklist, po)
    // REQ approval
    eventsarr.push({
      ID: this.req[0].REQ_No,
      DTTM: this.req[0].Approved_On,
      EventType: "Approval",
      Internal: true,
      ExternalStatus: "internal",
      Lifecycle: "REQ"
    })
    for (let reqWorklist_event of reqWorklist) {
      //console.log(reqWorklist_event)
      eventsarr.push({
        ID: reqWorklist_event.Appr_Inst,
        DTTM: reqWorklist_event.Date_Time,
        EventType: reqWorklist_event.Approval_Number + " " + reqWorklist_event.Work_List,
        Internal: true,
        ExternalStatus: "internal",
        Lifecycle: "REQ"
      })
    } 
    for (let poWorklist_event of po.worklist) {
      console.log(poWorklist_event)
    }
    console.log(this.po)
    console.log(eventsarr)
    return eventsarr
  }

}
