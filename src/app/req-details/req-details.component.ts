import { Component, OnInit } from '@angular/core';
import { ReqService } from '../services/req.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Req, Lines, User_Notes } from '../models/req';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-req-details',
  templateUrl: './req-details.component.html',
  styleUrls: ['./req-details.component.css']
})
export class ReqDetailsComponent implements OnInit {
  req: Req;
  commentForm: FormGroup;
  userNotes: User_Notes;
  currentUser: User;
  initialUser: User;
  date = new FormControl(new Date().getTime());
  user: User;
  interval;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private reqService: ReqService,
    private authService: AuthService,
    private formBuilder: FormBuilder
    ) { }
  ngOnInit() {
    this.interval = setInterval(()=>{
      this.getReq()
    }, 1000);

    this.getReq()
    this.currentUser = this.authService.currentUser;
    this.initialUser = this.authService.initialUser;
    this.commentForm = this.formBuilder.group({
      User: [this.initialUser.username, Validators.required],
      Date: this.date,
      Note_Info: ['', Validators.required]
    })
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getReq() {
    const id = this.route.snapshot.paramMap.get('id');
    this.reqService.getReq(id)
    .subscribe(
      req => {
        this.req = req[0];
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

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(this.commentForm.invalid) {
      console.log('invalid')
    } else {
      this.userNotes = new User_Notes();
      this.userNotes.User = this.commentForm.controls.User.value;
      this.userNotes.Date = this.commentForm.controls.Date.value;
      this.userNotes.Note_Info = this.commentForm.controls.Note_Info.value;
      this.reqService.addNote(id, this.userNotes).subscribe(
        note => {
          console.log(note);
          this.commentForm.controls.Note_Info.reset();
          this.getReq();
        }
      )
    }
  }
}
