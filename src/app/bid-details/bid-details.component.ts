import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BidService } from '../services/bid.service';
import { Bid, Buyer } from '../models/bid';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

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
  bidType = new FormControl(new String(), Validators.required);
  dbeOwner = new FormControl(new String());
  bidDeadline = new FormControl(new Date());
  preBidDttm = new FormControl(new Date());
  materialType = new FormControl(new String());
  panelOpenState: boolean = false;
  currentUser: User;
  initialUser: User;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bidService: BidService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.initialUser = this.authService.initialUser;
    this.getBid();
    this.bidForm  =  this.formBuilder.group({
        Bid_Type: this.bidType,
        Bid_ID: [''],
        Proj_Name: [''],
        PreBidDttm: this.preBidDttm,
        Bid_Deadline: this.bidDeadline,
        Pre_Bid_Location: [''],
        Dbe_Percentage: ['', Validators.max(100)],
        Dbe_Owner: this.dbeOwner,
        Material_Type: this.materialType
    });
  }

//   var bid = {
//     bidType: model.bidType,
//     bidNumber: model.bidNumber,
//     bidDesc: model.bidDesc,
//     bidDeadline: model.bidDeadline,
//     preBidDate: model.preBidDate,
//     preBidLocation: model.preBidLocation,
//     dbeOwner: model.dbeOwner,
//     dbePercent: model.dbePercent,
//     materialType: model.materialType
// };

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

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.editBid = new Bid();
    this.editBid.Bid_Type = this.bidForm.controls.Bid_Type.value
    this.editBid.Bid_ID = this.bidForm.controls.Bid_ID.value
    this.editBid.Proj_Name = this.bidForm.controls.Proj_Name.value

    this.bidService.updateBid(id, this.editBid).subscribe(
      bid => console.log(bid)
    );
    this.goBack();
  }
}
