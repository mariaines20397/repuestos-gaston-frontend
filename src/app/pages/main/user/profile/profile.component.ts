import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as UserActions from '../store/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private subscriptions = new Subscription();
  public disabledEmail: boolean = false;
  public disabledUsername: boolean = false;
  public user: any = {};
  public userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private userServices: UserService,
    private routeActive: ActivatedRoute,
    private store: Store<{ user: any }>
  ) {
    this.userForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      surname: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      username: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(50)]),
      dni: new FormControl(null, [Validators.required]),
      email: new FormControl({ value: null, disabled: true }, [Validators.required]),
      birthday: new FormControl(null),
      password: new FormControl(null, [Validators.required])
    });
    this.subscriptions.add(
      this.store
        .select('user')
        .subscribe((user) => {
          this.user = user;
          this.fillForm(this.user);
          this.disabledEmail = this.user.data.email ? true : false;
          this.disabledUsername = this.user.data.username ? true : false;
        })
    );
  }
  ngOnInit(): void {
    this.store.dispatch(UserActions.loadProfile());
  }
  public back(): void {
    this.router.navigate([`/users/profile`]);
  }
  public edituser(userProfile: any): void {
    const userEdit: any = {}
    const {
      name,
      surname,
      username,
      email,
      dni,
      birthday,
      password
    } = this.userForm.value
    const user = {
      name,
      surname,
      username,
      email,
      dni,
      birthday,
      password
    }
    userEdit.name = user.name == userProfile.name ? null : user.name;
    userEdit.surname = user.surname == userProfile.surname ? null : user.surname;
    userEdit.dni = user.dni == userProfile.dni ? null : user.dni;
    userEdit.username = user.username == userProfile.username ? null : user.username;
    userEdit.email = user.email == userProfile.email ? null : user.email;
    userEdit.birthday = user.birthday == userProfile.birthday ? null : user.birthday;
    userEdit.password = user.password == userProfile.password ? null : user.password;
    this.store.dispatch(UserActions.editUser({ user: userEdit }));
  }
  private fillForm(user: any): void {
    const {
      name,
      surname,
      username,
      dni,
      email,
      birthday,
      password
    } = user.data;
    this.userForm.patchValue({
      name,
      surname,
      username,
      email,
      dni,
      birthday,
      password,

    });
  }
}
