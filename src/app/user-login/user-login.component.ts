import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../objectives';
import { ObjectivesService } from '../objectives.service';
import { catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import { MyGuard } from '../my.guard';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  private addedUser: User = {id: '' , username: '' , password: ''};
  errors: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private services: ObjectivesService,
  ) { }

  userDetails = this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  });

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      console.log(localStorage.getItem('token'));
      this.router.navigateByUrl('/tasks-list');
    }
  }

  onRegister(): void {
    this.addedUser.username = this.userDetails.get('username')!.value;
    this.addedUser.password = this.userDetails.get('password')!.value;
    this.http.post(`http://localhost:3000/users`,this.addedUser).subscribe(
      (data: any ) => {
        this.errors = [];
        if (typeof data === 'object') {
          for ( let error of data.errors) {
            this.errors.push(error.msg);
          }
        }
      }
    );
    this.userDetails.setValue({username: '', password: ''});
    this.addedUser = {id: '' , username: '' , password: ''};
  }

  onLogin(): void {
    this.addedUser.username = this.userDetails.get('username')!.value;
    this.addedUser.password = this.userDetails.get('password')!.value;
    this.http.post(`http://localhost:3000/loggedUser`, this.addedUser).subscribe(
      (data: any) => {
        this.errors = [];
        if(typeof data == 'string') {
          localStorage.setItem('token', <string> data);
          this.services.setState();
          this.userDetails.setValue({username: '', password: ''});
          this.router.navigateByUrl('/tasks-list');
        }
        else {

          for ( let error of data.errors) {
            this.errors.push(error.msg);
          }
        }
      });
  }

}
