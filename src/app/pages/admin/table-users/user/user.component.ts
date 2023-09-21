import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../model/users.model';
import { ActivatedRoute, Router } from '@angular/router';
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
  nombreUser:string='';
  userId!:number;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private userServices:AdminUsersService,
    private routeActive: ActivatedRoute,
   ){
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
    this.userId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    this.llenarFormulario();
        // this.store.dispatch(ProductosAdminActions.loadUser(id));
}
   cancelar(){
    this.router.navigate(['/admin/usuarios'])
   }

  getUsers(){
    this.users=this.userServices.getUsers();
  }
  llenarFormulario(){
      this.getUsers();
      this.users.forEach(user=>{
        if (user.id == this.userId) {
          const {
            name,
            surname,
            dni,
            birthday,
            address,
            username,
            email
          } = user;

          this.nombreUser=name!;

          this.userForm.setValue({
            name,
            surname,
            dni,
            birthday,
            address,
            username,
            email
          })
        }
      })
      
  }


}
