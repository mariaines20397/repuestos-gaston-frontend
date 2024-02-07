import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
class AuthGuardianService {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.autenticado()) {
           return true;
         }
        this.router.navigate(['/login'])
        return false;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuardianService).canActivate(next, state);
}
// @Injectable()
// export class AuthGuard implements CanActivateFn{
//   constructor(
//     private authService: AuthService,
//     private router:Router
//   ){}
//   authGuard(): boolean {
//    if (this.authService.autenticado()) {
//      return true;
    
//    }
//   this.router.navigate(['/login'])
//   return false;

//   };
// }
