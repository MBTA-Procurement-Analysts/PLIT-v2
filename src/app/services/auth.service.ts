import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = {
    _id: "",
    username: "",
    password: "",
    role: "",
    fullname: "",
    email: "",
    loggedInBefore: null
  };

  initialUser: User = {
    _id: "",
    username: "",
    password: "",
    role: "",
    fullname: "",
    email: "",
    loggedInBefore: null
  };

  private currentUserSource = new BehaviorSubject(this.currentUser);
  globalCurrentUser = this.currentUserSource.asObservable();
  private initialUserSource = new BehaviorSubject(this.initialUser);
  globalInitialUser = this.initialUserSource.asObservable();
  users: User[];
  currentUserRole: string;
  userArrayLength = 0;

  constructor(private userService: UserService) { }

  public login(userInfo: User): boolean {
    this.getUsers();
    let isUser = false;
    for(var i=0; i < this.userArrayLength;  i++) {
      if(this.users[i].username === userInfo.username && this.users[i].role === userInfo.password) {
        isUser = true;
        this.currentUserRole = userInfo.role;
        this.currentUser._id = this.users[i]._id;
        this.currentUser.username = this.users[i].username;
        this.currentUser.password = this.users[i].role;
        this.currentUser.role = this.users[i].role;
        this.currentUser.fullname = this.users[i].fullname;
        this.currentUser.email = this.users[i].email;
        this.currentUser.loggedInBefore = this.users[i].loggedInBefore;

        this.initialUser._id = this.users[i]._id;
        this.initialUser.username = this.users[i].username;
        this.initialUser.password = this.users[i].role;
        this.initialUser.role = this.users[i].role;
        this.initialUser.fullname = this.users[i].fullname;
        this.initialUser.email = this.users[i].email;
        this.initialUser.loggedInBefore = this.users[i].loggedInBefore;
      }
    }
    this.setInitialUser(this.initialUser);
    this.changeUser(this.currentUser);
    return isUser;
  }

  public isAdmin(){
    if(this.currentUserRole === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  public getUsers() {
    this.userService.getUsers()
    .subscribe(
        users => {
          this.users = users;
          this.userArrayLength = this.users.length;
      }
    )
  }

  changeUser(user: User) {
    this.currentUser = user;
    console.log(this.currentUser);
  }

  setInitialUser(user: User) {
    this.initialUser = user;
    console.log(this.initialUser);
  }


  changeImpersonatedUser(id: string) {
    this.getUsers();
    for(var i=0; i < this.userArrayLength;  i++) {
      if(this.users[i]._id === id) {
        this.currentUser._id = this.users[i]._id;
        this.currentUser.username = this.users[i].username;
        this.currentUser.password = this.users[i].role;
        this.currentUser.role = this.users[i].role;
        this.currentUser.fullname = this.users[i].fullname;
        this.currentUser.email = this.users[i].email;
        this.currentUser.loggedInBefore = this.users[i].loggedInBefore;
      }
    }
    this.changeUser(this.currentUser);
  }
}
