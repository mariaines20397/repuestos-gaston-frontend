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
  public registerForm: FormGroup;
  private user: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ user: User }>
  ) {
    this.registerForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      password: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      dni: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  public register(): void {
    const {
      username,
      password,
      name,
      dni,
      surname,
      email
    } = this.registerForm.value
    this.user = {
      username,
      password,
      dni,
      name,
      surname,
      email
    }

    this.store.dispatch(RegisterActions.loadRegister({ user: this.user }));
  }
}
