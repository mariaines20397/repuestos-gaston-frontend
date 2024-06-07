// import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as LoginActions from './store/login.actions';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../main/user/model/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  // usuarioPrueba:User={
  //   username:'usuario123',
  //   password:'123456'
  // }
  // adminPrueba:User={
  //   username:'admin',
  //   password:'admin'
  // }
  loginForm:FormGroup;
  user:any;

  constructor(
   private formBuilder: FormBuilder,
   private router: Router,
   private store:Store<{ user:User}>,
  //  private authService : AuthService
  ){
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required])
    });
    this.user = new User();
  }
  ngOnInit(): void {
    // if (this.authService.autenticado()) {
    //   Swal.fire('Autenticado',`Hola ${this.authService.usuario.username} ya estas autenticado`,'info')
    //   this.router.navigate(['/home'])
    // }
  }
  login():void{
    this.user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }    
    this.store.dispatch(LoginActions.loadLogin({user:this.user}));
    // if (this.user.username == this.usuarioPrueba.username &&
    //   this.user.password == this.usuarioPrueba.password) {
    //     // this.user.jwt = 'jwtNuevo'
    //     // this.router.navigate(['/home']);
    // }else if(this.user.username == this.adminPrueba.username &&
    //   this.user.password == this.adminPrueba.password){
    //     this.router.navigate(['/admin']);
    //   }else{
    //   Swal.fire('¡Lo siento!', 'Usuario o contraseña incorrectas. Por favor vualve a intentarlo.', 'error');
    // }
  }

  register():void{
    this.router.navigate(['/register'])
  }


}
