import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../objectives';
import { ObjectivesService } from '../objectives.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  private addedUser: User = {id: -2 , username: '' , password: ''};
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private services: ObjectivesService
  ) { }

  userDetails = this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  });

  ngOnInit(): void {
  }

  onRegister(): void {
    this.addedUser.username = this.userDetails.get('username')!.value;
    this.addedUser.password = this.userDetails.get('password')!.value;
    this.http.post(`http://localhost:3000/users`,this.addedUser).subscribe(
      data => this.errorMessage = data.toString()
    );
    this.userDetails.setValue({username: '', password: ''});
    this.addedUser = {id: -2 , username: '' , password: ''};
  }

  onLogin(): void {
    this.addedUser.username = this.userDetails.get('username')!.value;
    this.addedUser.password = this.userDetails.get('password')!.value;
    this.http.post(`http://localhost:3000/loggedUser`, this.addedUser).subscribe(
      data => {
        this.errorMessage = this.services.setState(data.toString());
        this.userDetails.setValue({username: '', password: ''});
        this.router.navigateByUrl('/tasks-list');
      }
    )
  }
}
