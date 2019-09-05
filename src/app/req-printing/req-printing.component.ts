import { Component, OnInit } from '@angular/core';
import { ReqService } from '../services/req.service';
import { LastupdatedService } from '../services/lastupdated.service';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router'
import { Req, Lines, User_Notes } from '../models/req';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Location, formatDate } from '@angular/common';
import { plenv } from "../../environments/prologenvironment";


@Component({
  selector: 'app-req-printing',
  templateUrl: './req-printing.component.html',
  styleUrls: ['./req-printing.component.css']
})
export class ReqPrintingComponent implements OnInit {

  reqs: Req[];
  currentUser: User;
  initialUser: User;
  reqPrintingForm: FormGroup;
  date = new FormControl(new Date());
  userName = new FormControl(new String());
  invBuyers = plenv.invBuyers;
  reqLU: Date;
  itemLU: Date;
  loadDate: Date;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private reqService: ReqService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private luService: LastupdatedService,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.initialUser = this.authService.initialUser;
    this.reqPrintingForm = this.formBuilder.group({
      userName: this.userName,
      date: this.date
    })
    this.luService.getLU("REQ_DATA")
    .subscribe(res => {
      console.log(res);
      this.reqLU = new Date(res[0].last_updated_time * 1000);
    })
    this.luService.getLU("ITEM_DATA")
    .subscribe(res => {
      this.itemLU = new Date(res[0].last_updated_time * 1000);
    })
    this.loadDate = new Date();
  }

  getReqPrints() {
    let dateString: string = formatDate(this.date.value, "MM-dd-yyyy", "en-US");
    if (this.userName.value == "*INV") {
      this.reqService.getReqPrintAll(dateString)
        .subscribe(reqs => {
          this.reqs = reqs
        });
    } else {
      this.reqService.getReqPrintUser(dateString, this.userName.value)
        .subscribe(reqs => {
          this.reqs = reqs
        });

    }
  }

  onSubmit() {
    let inputusername = this.userName.value
    this.userName.setValue(inputusername.toUpperCase())
    this.getReqPrints();
  }

  showUserReqs() {
    this.userName.setValue(this.currentUser.username.toUpperCase())
    let today: Date = new Date();
    this.date.setValue(today);
    this.getReqPrints();
  }

  showINVReqs() {
    this.userName.setValue("*INV");
    let today: Date = new Date();
    this.date.setValue(today);
    this.getReqPrints();
  }

  openPrint() {
    window.print();
  }
}
