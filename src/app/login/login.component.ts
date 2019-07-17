import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { AuthService } from  '../services/auth.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;
  isUser = false;
  public currentUser: User;
  users: User[];
  userArrayLength = 0;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

    ngOnInit() {
      this.getUsers();

      this.loginForm  =  this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      this.currentUser = {
        _id: "",
        username: "",
        password: "",
        role: "",
        fullname: "",
        email: "",
        loggedInBefore: null
      };
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

  get formControls() {
    return this.loginForm.controls;
  }

  login(){
    this.getUser();
    this.isSubmitted = true;

    if(this.loginForm.invalid){
      return;
    }
    if(this.authService.login(this.loginForm.value) === false) {
      this.isSubmitted = false;
      this.isUser = false;
      return;
    } else if(this.currentUser.role === "Admin") {
      this.authService.isAdmin();
      this.router.navigateByUrl('/dashboard/reqs');
    } else {
      this.router.navigateByUrl('/dashboard/reqs');
    }
  }

  getUser() {
    this.currentUser = this.loginForm.value;

    for(var i=0; i<this.userArrayLength; i++) {
      if(this.currentUser.username === this.users[i].username) {
        this.currentUser.username = this.users[i].username;
        this.currentUser.role = this.users[i].role;
      }
    }
  }
}
