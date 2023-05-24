// import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { User } from '../register/model/users.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as LoginActions from './store/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup;
  user:User = {};

  constructor(
   private formBuilder: FormBuilder,
   private router: Router,
   private store:Store<{ user:User}>
  ){
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.minLength(20)]),
      password: new FormControl(null, [Validators.required])
    })
  }

  login():void{
    this.user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.store.dispatch(LoginActions.loadLogin({user:this.user}))
    console.log(this.user);
  }

  register():void{
    this.router.navigate(['/register'])
  }


}
