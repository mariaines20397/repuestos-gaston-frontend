import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/users.model';
import { Store } from '@ngrx/store';
import * as userArctions from '../store/user.actions'
import { Subscription } from 'rxjs';
import * as UserActions from '../store/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  private subscriptions = new Subscription();
  disabledEmail:boolean = false;
  disabledUsername: boolean = false;
  datosUsuario:any[]=[
    {
      id:1,
      name:'María Inés',
      surname:'Toledo',
      username:'mariainestoledo',
      email:'mariainestoledo20397@gmail.com',
      telefono:3804590089,
      documento:39905178
    }
  ]
  userId!:number;
  user:any={};
  nombreUsuario='';
  userForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private userServices:UserService,
    private routeActive: ActivatedRoute,
    private store:Store<{user:any}>
   ){
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
          this.llenarFormulario(this.user);
          this.disabledEmail = this.user.data.email? true : false;
          this.disabledUsername = this.user.data.username? true : false;
        })
    );
   }
   ngOnInit(): void {
    // this.store.dispatch(userArctions.loadUserById(id));
    this.store.dispatch(UserActions.loadProfile());
   // this.llenarFormulario()   
  }
  cancelar(){
    this.router.navigate([`/users/profile`]);
  }
  editar(userProfile:any){
    const userEdit:any = {}
    const {
      name,
      surname,
      username,
      email,
      dni,
      birthday,
      password
    } = this.userForm.value
    const user={
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
    console.log(userEdit);
    console.log(this.userForm.value);
    console.log(userProfile);
    console.log(user);
    this.store.dispatch(UserActions.editUser({user:userEdit}));

    // this.store.dispatch(userArctions.editUser(id,user));
  }
  llenarFormulario(user:any){
   // this.datosUsuario.forEach(user=>{
     // if (user.id == this.userId) {
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
          
        })
     // }
    //})
    
}
}
