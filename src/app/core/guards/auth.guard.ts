import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
class AuthGuardianService {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.autenticado() && !this.authService.admin()) {
           return true;
    }
        this.router.navigate(['/home'])
        return false;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuardianService).canActivate(next, state);
}
