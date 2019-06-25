import { Component, OnInit } from '@angular/core';
import { Po } from '../models/po';
import { PoService } from '../services/po.service';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class PoComponent implements OnInit {
  pos: Po[];

  constructor(
    private poService: PoService
  ) { }

  ngOnInit() {
    this.getPos();
  }

  getPos(): void {
    this.poService.getPos()
    .subscribe(
      pos => this.pos = pos
    );
  }
}
