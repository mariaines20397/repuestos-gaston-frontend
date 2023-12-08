import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../model/users.model';
import { AdminUsersService } from '../services/admin-users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userForm:FormGroup;
  user:User={};
  users:User[]=[];
  @Input() mostrarUsuario: User = {};
  constructor(
    private formBuilder: FormBuilder,
    private userServices:AdminUsersService
  ) {
    this.userForm = this.formBuilder.group({
                  name:new FormControl(null),
                  surname:new FormControl(null),
                  dni:new FormControl(null),
                  birthday:new FormControl(null),
                  address:new FormControl(null),
                  username:new FormControl(null),
                  email:new FormControl(null),
           });
  }
 ngOnInit(): void {
  this.userServices.disparadorUsuario.subscribe(data => {
    this.llenarFormulario(data);

  })
}
  getUsers(){
    this.users=this.userServices.getUsers();
  }
  llenarFormulario(data:User){
    this.user = data;
    this.userForm.patchValue({
      name:data.name,
      surname: data.surname,
      dni:data.dni,
      birthday: data.birthday,
      address: data.address,
      username: data.username,
      email: data.email
    })
  }
  cancelar() {
    this.user = {}
    this.userForm.reset();
  }

}
