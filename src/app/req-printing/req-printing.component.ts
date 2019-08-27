import { Component, OnInit } from '@angular/core';
import { ReqService } from '../services/req.service'
import { ActivatedRoute } from '@angular/router' 
import { Req, Lines, User_Notes } from '../models/req';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Location, formatDate } from '@angular/common';


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


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private reqService: ReqService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.initialUser = this.authService.initialUser;
    console.log(this.currentUser.username.toUpperCase())
    console.log(this.reqs)
    this.reqPrintingForm = this.formBuilder.group({
      userName: this.userName,
      date: this.date
    })
  }

  getReqPrints(){
    let dateString: string = formatDate(this.date.value, "MM-dd-yyyy", "en-US");
    console.log(dateString)
    this.reqService.getReqPrintAll(dateString)
    .subscribe(reqs => {
      this.reqs = reqs
      console.log(this.reqs)
    });
  }

  onSubmit(){
    console.log(this.date);
    console.log(this.userName);
    this.getReqPrints();
  }

  showUserReqs(){
    this.userName.setValue(this.currentUser.username.toUpperCase())
    let today: Date = new Date();
    this.date.setValue(today);
    this.getReqPrints();
  }

  showINVReqs(){
    this.userName.setValue("*INV");
    let today: Date = new Date();
    this.date.setValue(today);
    this.getReqPrints();
  }

  openPrint(){
    console.log("print?")
    window.print();
  }
}
