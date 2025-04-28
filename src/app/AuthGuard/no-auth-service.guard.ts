import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../AuthService/auth-service.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    return true;
  }

  try {
    let currentUserRole = '';
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      currentUserRole = JSON.parse(currentUser).role;
    }

    const redirectPath = currentUserRole === 'Host' ? '/host' : '/';
    router.navigate([redirectPath]);
    return false;
  } catch (error) {
    console.error('Error in noAuthServiceGuard:', error);
    authService.logout();
    return true;
  }
};
