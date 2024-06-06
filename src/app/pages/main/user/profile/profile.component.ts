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
      username: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      dni: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
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
          console.log(this.user);
          
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
  editar(){
    const {
      name,
      surname,
      dni,
      birthday,
      username,
      email,
      password,
      
    } = this.userForm.value
    const user={
      name,
      surname,
      dni,
      birthday,
      email,
      username,
      password,
      
    }
    console.log(user);
    
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
