import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/pages/main/user/model/users.model';

@Injectable({
  providedIn: 'root'
})
class AdminGuardianService {

  constructor(
    private authService: AuthService,
    private router: Router,
    private store:Store<{ user: User }>,

  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   /* if (this.authService.autenticado() && this.user. === 'ROLE_USER') {
          this.router.navigate(['/admin'])
           return false;
         }*/
        return true;
  }
}

export const AdminGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AdminGuardianService).canActivate(next, state);
}
