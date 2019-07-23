import { Component, OnInit, ViewChild } from '@angular/core';
import { BidService } from '../services/bid.service';
import { Bid, Buyer } from '../models/bid';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public dataSource: any;

  displayedColumns: string[] = [
    'Bid Number',
    'Bid Description',
    'Request Date',
    'Bid Open Date'
  ]

  bids: Bid[];
  bid: Bid;
  buyer: Buyer;
  bidForm: FormGroup;
  date = new FormControl(new Date());
  fundCode = new FormControl(new String(), Validators.required);
  bidType = new FormControl(new String(), Validators.required);
  requestedDttm = new Date().getTime();

  constructor(
    private bidService: BidService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getBids();

    this.bidForm  =  this.formBuilder.group({
        Buyer: [this.authService.currentUser.username, Validators.required],
        Req_ID: ['', Validators.required],
        Proj_Name: ['', Validators.required],
        Fund_Code: this.fundCode,
        Bid_Type: this.bidType,
        Timeframe: this.date,
        comments: ['', Validators.required],
        Requested_Dttm: this.requestedDttm
    });
  }

  getBids() {
    this.bidService.getBids()
    .subscribe(
      bids => {
        this.bids = bids;
        this.dataSource = bids;
        this.dataSource.paginator = this.paginator;
        this.iterator();
      }
    );
  }

  onSubmit() {
    if(this.bidForm.invalid) {
      return;
    } else {
      this.bid = new Bid();
      this.buyer = new Buyer();
      this.bid.Buyer = new Buyer();
      this.buyer.username = this.bidForm.controls.Buyer.value;
      this.bid.Buyer.fullname = this.buyer.fullname;
      this.bid.Req_ID = this.bidForm.controls.Req_ID.value;
      this.bid.Proj_Name = this.bidForm.controls.Proj_Name.value;
      this.bid.Fund_Code = this.bidForm.controls.Fund_Code.value;
      this.bid.Bid_Type = this.bidForm.controls.Bid_Type.value;
      this.bid.Timeframe = this.bidForm.controls.Timeframe.value;
      this.bid.comments = this.bidForm.controls.comments.value;
      this.bid.Requested_Dttm = this.bidForm.controls.Requested_Dttm.value;

      this.bidService.addBid(this.bid)
      .subscribe(
        bid => {
          this.bids.push(bid);
          this.getBids();
        }
      )
    }
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    console.log(this.dataSource);
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.bids.slice(start, end);
    this.dataSource = part;
  }
}
