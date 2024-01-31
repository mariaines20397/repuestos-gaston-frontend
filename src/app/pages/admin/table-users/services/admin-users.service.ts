import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../model/users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  @Output() disparadorUsuario:EventEmitter<any>= new EventEmitter();
  constructor(
    private httpClient: HttpClient,
  ) { }

  users: User[] = [
    {
      id:1,
      name:'Maria Ines',
      surname:'Toledo',
      dni:39905178,
      birthday:'20/3/97',
      
      username:'mariainestoledo',
      password:'123456',
      email:'mariainestoledo20397@gmail.com'
    },
    {
      id: 2,
      name:'Claudio',
      surname:'Mercado',
      dni:39300525,
      birthday:'14/5/96',
      
      username:'claudiomercado',
      password:'123456',
      email:'claudiomercado19@gmail.com'
    },
    {
      id: 3,
      name:'Rosario',
      surname:'Nieto',
      dni:13341034,
      birthday:'02/5/86',
      
      username:'rosarionieto',
      password:'123456',
      email:'rosarionieto@gmail.com'
    },
    {
      id: 3,
      name:'Rosario',
      surname:'Nieto',
      dni:13341034,
      birthday:'02/5/86',
      
      username:'rosarionieto',
      password:'123456',
      email:'rosarionieto@gmail.com'
    },
    {
      id: 3,
      name:'Rosario',
      surname:'Nieto',
      dni:13341034,
      birthday:'02/5/86',
      
      username:'rosarionieto',
      password:'123456',
      email:'rosarionieto@gmail.com'
    },
    {
      id: 3,
      name:'Rosario',
      surname:'Nieto',
      dni:13341034,
      birthday:'02/5/86',
      
      username:'rosarionieto',
      password:'123456',
      email:'rosarionieto@gmail.com'
    },
    {
      id: 3,
      name:'Rosario',
      surname:'Nieto',
      dni:13341034,
      birthday:'02/5/86',
      
      username:'rosarionieto',
      password:'123456',
      email:'rosarionieto@gmail.com'
    },
    {
      id: 3,
      name:'Rosario',
      surname:'Nieto',
      dni:13341034,
      birthday:'02/5/86',
      
      username:'rosarionieto',
      password:'123456',
      email:'rosarionieto@gmail.com'
    }
  ]

  getUsers(): User[] {
    return this.users;
  }
  getUserByIdAdmin(id:number):Observable<any> {
    const finalUrl=`localhost:8080/admin/users/${id}`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl)
      .subscribe({
        next: (res) => {
          // this.router.navigate(['/home']);
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          // Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }
  getUsersAdmin():Observable<any> {
    const finalUrl=`localhost:8080/admin/users`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl)
      .subscribe({
        next: (res) => {
          // this.router.navigate(['/home']);
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          // Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }
}
