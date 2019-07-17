import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BidService } from '../services/bid.service';
import { Bid, Buyer } from '../models/bid';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bid-details',
  templateUrl: './bid-details.component.html',
  styleUrls: ['./bid-details.component.css']
})
export class BidDetailsComponent implements OnInit {
  bid: Bid;
  editBid: Bid;
  buyer: Buyer;
  bidForm: FormGroup;
  date = new FormControl(new Date());
  fundCode = new FormControl(new String(), Validators.required);
  bidType = new FormControl(new String(), Validators.required);
  requestedDttm = new Date().getTime();
  panelOpenState: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bidService: BidService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getBid();

    this.bidForm  =  this.formBuilder.group({
        Buyer: ['', Validators.required],
        Req_ID: ['', Validators.required],
        Proj_Name: ['', Validators.required],
        Fund_Code: this.fundCode,
        Bid_Type: this.bidType,
        Timeframe: this.date,
        comments: ['', Validators.required],
        Requested_Dttm: this.requestedDttm
    });
  }

  getBid() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bidService.getBid(id)
    .subscribe(
      bid => {
        this.bid = bid[0];
        console.log(this.bid);
      }
    )
  }

  deleteBid() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bidService.deleteBid(id)
    .subscribe();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState
  }
}
