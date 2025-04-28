import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../AuthService/auth-service.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  if (auth.isHost() && !state.url.startsWith('/host')) {
    return router.createUrlTree(['/host/dashboard']);
  }

  if (auth.isGuest() && state.url.startsWith('/host')) {
    return router.createUrlTree(['/']);
  }

  return true;
};
