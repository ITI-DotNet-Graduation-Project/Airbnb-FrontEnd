import { Injectable } from '@angular/core';
import { User } from '../models/User.models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7042/api/Auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser: User | null = null;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        console.log(response);
        this.storeTokens(response);
        this.currentUserSubject.next(response);
      })
    );
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

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http
      .post(`${this.apiUrl}/refresh`, {
        token: this.getAccessToken(),
        refreshToken,
      })
      .pipe(tap((response) => this.storeTokens(response)));
  }

  confirmEmail(userId: string, code: string) {
    return this.http.get(`${this.apiUrl}/confirm-email`, {
      params: { userId, code },
    });
  }

  private storeTokens(authResult: any) {
    localStorage.setItem('accessToken', authResult.taken);
    localStorage.setItem('refreshToken', authResult.refreshToken);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  isAuthenticated() {
    return !!this.getAccessToken();
  }
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
  }
  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/forget-password`, { email });
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
