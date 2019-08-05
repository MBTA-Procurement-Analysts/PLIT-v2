import { Component, OnInit } from '@angular/core';
import { Req, Worklist } from '../models/req';
import { Po, Worklist as PoWorklist } from '../models/po';
import { ReqService } from '../services/req.service';
import { PoService } from '../services/po.service';
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
    console.log(poNum)
    this.poService.getPo(poNum).subscribe(
      po => {
        this.po = po[0];
        console.log(this.po)
      }
    )
  }

  getWorklist() {
    const id = this.route.snapshot.paramMap.get('id');
    this.reqService.getReq(id).subscribe(
      req => {
        this.req = req;
        this.worklist = req[0].worklist;
        this.poNums = this.getPoNumsFromReq(req[0])
        //this.getPo(this.poNum)
        this.events = this.toTimelineEvents(req[0], this.worklist, this.po);
      }
    )
    console.log(this.poNums)
  }

  toTimelineEvents(req, worklist, po): TimelineEvent[] {
    var eventsarr = []
    // REQ approval
    eventsarr.push({
      ID: this.req[0].REQ_No,
      DTTM: this.req[0].Approved_On,
      EventType: "Approval",
      Internal: true,
      ExternalStatus: "internal",
      Lifecycle: "REQ"
    })
    for (let worklist_event of worklist) {
      console.log(worklist_event)
      eventsarr.push({
        ID: worklist_event.Appr_Inst,
        DTTM: worklist_event.Date_Time,
        EventType: worklist_event.Approval_Number + " " + worklist_event.Work_List,
        Internal: true,
        ExternalStatus: "internal",
        Lifecycle: "REQ"
      })
    } 
    console.log(this.po)
    console.log(eventsarr)
    return eventsarr
  }

}
