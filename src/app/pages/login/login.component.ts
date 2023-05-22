import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../register/model/users.model';
import { Router } from '@angular/router';

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
   private router: Router
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
    console.log(this.user);
  }

  register():void{
    this.router.navigate(['/register'])
  }


}
