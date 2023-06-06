// import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { User } from '../register/model/users.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as LoginActions from './store/login.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuarioPrueba:User={
    username:'usuario123',
    password:'123456'
  }
  loginForm:FormGroup;
  user:User = {};

  constructor(
   private formBuilder: FormBuilder,
   private router: Router,
   private store:Store<{ user:User}>
  ){
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required])
    })
  }

  login():void{
    this.user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    if (this.user.username == this.usuarioPrueba.username &&
      this.user.password == this.usuarioPrueba.password) {
      this.router.navigate(['/home']);
        // this.store.dispatch(LoginActions.loadLogin({user:this.user}));
    }else{
      Swal.fire('¡Lo siento!', 'Usuario o contraseña incorrectas. Por favor vualve a intentarlo.', 'error');
    }
    // this.user == this.usuarioPrueba?
    //   this.store.dispatch(LoginActions.loadLogin({user:this.user})):
    //   console.log('No se encontró el usuario');
  }

  register():void{
    this.router.navigate(['/register'])
  }


}
