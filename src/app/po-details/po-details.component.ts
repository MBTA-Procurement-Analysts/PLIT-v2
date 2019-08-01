import { Component, OnInit } from '@angular/core';
import { PoService } from '../services/po.service';
import { Po } from '../models/po';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-po-details',
  templateUrl: './po-details.component.html',
  styleUrls: ['./po-details.component.css']
})
export class PoDetailsComponent implements OnInit {
  po: Po;

  constructor(
    private poService: PoService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPo();
  }

  getPo() {
    const id = this.route.snapshot.paramMap.get('id');

    return this.poService.getPo(id)
    .subscribe(
      po => {
        console.log(po);
        this.po = po[0]
      }
    )
  }

  goBack() {
    this.location.back();
  }
}
