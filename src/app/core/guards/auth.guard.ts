import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/account/auth/login/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
    // Listen for storage events to handle logout in other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === 'logout') {
        this.authenticationService.logout();
        this.router.navigate(['/account/login']);
      }
    });
  }

  

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isLoggedIn()) {
      // User is logged in, so return true
      return true;
    }

    // User is not logged in, so redirect to login page with the return url
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
