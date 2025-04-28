import { Injectable } from '@angular/core';
import { User } from '../models/User.models';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../models/RegisterRequest.modes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7042/api/Auth';
  currentUser: any = null;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }

  getUserId() {
    try {
      const currentUserStr = localStorage.getItem('currentUser');
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr);
        if (currentUser?.id) {
          return currentUser.id;
        }
      }
    } catch (error) {
      console.error('Error retrieving id:', error);
      return '';
    }
  }

  getCurrentUser() {
    return this.http
      .get<User>(`https://localhost:7042/api/Users/current`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching current user', error);
          throw error;
        })
      );
  }

  updateProfile(userId: number, formData: FormData): Observable<User> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http
      .put<User>(`https://localhost:7042/api/Users/profile`, formData)
      .pipe(
        tap((updatedUser) => {
          currentUser.firstName = updatedUser.firstName;
          currentUser.lastName = updatedUser.lastName;
          currentUser.email = updatedUser.email;
          currentUser.imageUrl = updatedUser.imageUrl;
        })
      );
  }
  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token || typeof token !== 'string' || token.trim().length === 0) {
      return false;
    }

    return true;
  }
  getCurrentUserId() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      return JSON.parse(user).id;
    }
    return null;
  }
  getToken(): string | null {
    try {
      const currentUserStr = localStorage.getItem('currentUser');
      console.log(currentUserStr);
      if (!currentUserStr) return null;
      const currentUser = JSON.parse(currentUserStr);
      return currentUser.token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    console.log('===>', token);
    return new HttpHeaders({
      Authorization: `${token}`,
    });
  }
  register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  confirmEmail(userId: string, code: string) {
    return this.http.get(`${this.apiUrl}/confirm-email`, {
      params: { userId, code },
    });
  }

  logout() {
    const yourUser = localStorage.getItem('currentUser');
    let token = '',
      refreshtoken = '';
    if (yourUser) {
      token = JSON.parse(yourUser).token;
      refreshtoken = JSON.parse(yourUser).refreshToken;
    }
    console.log(token, refreshtoken);
    localStorage.clear();
    return this.revokeToken(token, refreshtoken);
  }
  revokeToken(token, refreshtoken) {
    return this.http.post(`${this.apiUrl}/revoke-refresh-token`, {
      token,
      refreshtoken,
    });
  }
  getRole() {
    const current = localStorage.getItem('currentUser');
    let role = '';
    if (current) {
      role = JSON.parse(current).role;
    }
    return role;
  }
  isHost() {
    return this.getRole() == 'Host';
  }
  isGuest() {
    return this.getRole() == 'Guest';
  }
  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/forget-password`, { email });
  }
  startAutoLogout(expireInSeconds: number) {
    setTimeout(() => {
      this.logout();
    }, expireInSeconds * 1000);
  }

  resetPassword(email: string, code: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      email,
      code,
      newPassword,
    });
  }
  verifyEmail(userId: string, code: string) {
    return this.http.get(`${this.apiUrl}/confirmation-email`, {
      params: { userId, code },
    });
  }

  resendVerificationEmail(email: string) {
    return this.http.post(`${this.apiUrl}/resend-confirmation-email`, {
      email,
    });
  }
}
