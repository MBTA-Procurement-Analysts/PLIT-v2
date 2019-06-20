import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  initialUser: User;
  currentUser: User

  constructor(
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.globalInitialUser.subscribe(user => this.initialUser = user);
    this.authService.globalCurrentUser.subscribe(user => this.currentUser = user);
  }
}
