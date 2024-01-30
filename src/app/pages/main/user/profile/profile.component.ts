import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/users.model';
import { Store } from '@ngrx/store';
import * as userArctions from '../store/user.actions'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
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
  user:User={};
  nombreUsuario='';
  userForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private userServices:UserService,
    private routeActive: ActivatedRoute,
    private store:Store<{user:User}>
   ){
     this.userForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      surname: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      username: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      dni: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required])
     });
   }
   ngOnInit(): void {
    this.userId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    // this.store.dispatch(userArctions.loadUserById(id));
    this.llenarFormulario()   
  }
  cancelar(id:number){
    this.router.navigate([`/users/profile/${id}`]);
  }
  editar(id:number){
    const {
      name,
      surname,
      dni,
      birthday,
      username,
      password,
      address
    } = this.userForm.value
    const user={
      name,
      surname,
      dni,
      birthday,
      username,
      password,
      address
    }
    console.log(user);
    
    // this.store.dispatch(userArctions.editUser(id,user));
  }

  llenarFormulario(){
    this.datosUsuario.forEach(user=>{
      if (user.id == this.userId) {
        const {
          name,
          surname,
          username,
          dni,
          birthday,
          password,
          address
        } = user
        this.nombreUsuario=`${name} ${surname}`!;
        this.userForm.patchValue({
          name,
          surname,
          username,
          dni,
          birthday,
          password,
          address
        })
      }
    })
    
}
}
