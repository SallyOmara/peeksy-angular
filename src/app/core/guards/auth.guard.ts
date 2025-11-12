import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  // Check token --> true, false
  const cookieService = inject(CookieService);
  const router = inject(Router);
  if (cookieService.get('token')) {
    return true;
  } else {
    // navigate to login
    return router.parseUrl('/login');
  }
};
