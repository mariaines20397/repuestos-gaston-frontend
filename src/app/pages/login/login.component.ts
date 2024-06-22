import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as LoginActions from './store/login.actions';
import { User } from '../main/user/model/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;
  private user: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<{ user: User }>
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required])
    });
    this.user = new User();
  }
  public login(): void {
    this.user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.store.dispatch(LoginActions.loadLogin({ user: this.user }));
  }

  public register(): void {
    this.router.navigate(['/register'])
  }


}
