import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './AuthService/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class HostGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // if (!this.authService.isHost()) {
    //   this.router.navigate(['/']);
    //   return false;
    // }
    return true;
  }
}
