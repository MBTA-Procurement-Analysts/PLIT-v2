import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-impersonation',
  templateUrl: './impersonation.component.html',
  styleUrls: ['./impersonation.component.css'],
})


export class ImpersonationComponent implements OnInit {
  currentUser: User;
  initialUser: User;
  public users: User[];
  userArrayLength = null;


  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.authService.globalCurrentUser.subscribe(user => this.currentUser = user);
    this.authService.globalInitialUser.subscribe(user => this.initialUser = user);
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(
      users => {
        this.users = users;
        this.userArrayLength = this.users.length;
      }
    );
  }

  changeUser(id: string) {
    this.authService.changeImpersonatedUser(id);
    this.authService.globalCurrentUser.subscribe(user => this.currentUser = user);
    console.log(this.currentUser);
  }
}
