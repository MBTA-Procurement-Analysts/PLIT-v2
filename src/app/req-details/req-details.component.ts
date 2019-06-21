import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-req-details',
  templateUrl: './req-details.component.html',
  styleUrls: ['./req-details.component.css']
})
export class ReqDetailsComponent implements OnInit {

  constructor() {}

  ngOnInit() {
      $('.dropdown-trigger').dropdown({ constrainWidth: false });
  }

}
