import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as RegisterActions from './store/register.actions';
import Swal from 'sweetalert2';
import { User } from '../main/user/model/users.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm:FormGroup;
  user:User = {};
  // passwordRepeat:any;
  constructor(
    private formBuilder: FormBuilder,
   private router: Router,
   private store:Store<{ user:User}>
  ){
    this.registerForm = this.formBuilder.group({
      Username: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      password: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  register(){
      const {
        Username,
        password,
        name,
        surname,
        email
      } = this.registerForm.value
      this.user = {
        Username,
        password,
        name,
        surname,
        email
      }
      // Swal.fire(
      //   {title:'¡Usuario registrado!', 
      //   html:'<p>Todo esta listo. Ahora inicia sesión para vivir la experiencia de Repuestos Gastón</p>',
      //   icon:'success',
      //   confirmButtonText:'Iniciar Sesión',
      //   showConfirmButton: true,
      // }).then((result)=>{
      //   if (result.isConfirmed) {
      //     this.router.navigateByUrl('/login')
      //   }
      // });


    this.store.dispatch(RegisterActions.loadRegister({user:this.user}))
    console.log(this.user);
  }
}
