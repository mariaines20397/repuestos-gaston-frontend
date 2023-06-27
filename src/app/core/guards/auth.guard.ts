import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router:Router
  ){}
  authGuard: CanActivateFn = (route, state) => {
   if (this.authService.autenticado()) {
     return true;
    
   }
   this.router.navigate(['/login'])
   return false;

  };
}
