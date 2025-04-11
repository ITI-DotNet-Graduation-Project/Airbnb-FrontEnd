import { Injectable } from '@angular/core';
import { User } from '../models/User.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = false;
  private _currentUser: User | null = null;

  constructor() {
    this.checkLoginStatus();
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get currentUser(): User | null {
    return this._currentUser;
  }

  private checkLoginStatus(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this._isLoggedIn = true;

      const userData = localStorage.getItem('user_data');
      if (userData) {
        this._currentUser = JSON.parse(userData);
      }
    }
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this._isLoggedIn = true;
        this._currentUser = {
          id: '123',
          name: 'John Doe',
          email: email,
          profileImage:
            'https://a0.muscache.com/defaults/user_pic-50x50.png?v=3',
        };

        localStorage.setItem('auth_token', 'sample_token');
        localStorage.setItem('user_data', JSON.stringify(this._currentUser));

        resolve(true);
      }, 500);
    });
  }

  logout(): void {
    this._isLoggedIn = false;
    this._currentUser = null;

    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  register(name: string, email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this._isLoggedIn = true;
        this._currentUser = {
          id: '123',
          name: name,
          email: email,
          profileImage:
            'https://a0.muscache.com/defaults/user_pic-50x50.png?v=3',
        };

        localStorage.setItem('auth_token', 'sample_token');
        localStorage.setItem('user_data', JSON.stringify(this._currentUser));

        resolve(true);
      }, 500);
    });
  }
}
