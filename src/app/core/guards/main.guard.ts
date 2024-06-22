import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
class MainGuardianService {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.authenticated()) {
      return true;
  }
  this.router.navigate(['/home']);
    return false;
  }
}

export const MainGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(MainGuardianService).canActivate(next, state);
}
