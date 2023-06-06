import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  postRegister(user:object):Observable<any>{
    const finalUrl='localhost:8080/register';

    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,user).subscribe({
        next: (res) => {
          Swal.fire(
            {title:'¡Usuario registrado!', 
            html:'<p>Todo esta listo. Ahora inicia sesión para vivir la experiencia de Repuestos Gastón</p>',
            icon:'success',
            confirmButtonText:'Iniciar Sesión',
            showConfirmButton: true,
          }).then((result)=>{
            if (result.isConfirmed) {
              this.router.navigateByUrl('/login')
            }
          });          
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', 'Algo salió mal... Por favor, vuelve a intentarlo.','error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }
}
