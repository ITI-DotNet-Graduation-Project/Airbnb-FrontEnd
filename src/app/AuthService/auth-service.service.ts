import { Injectable } from '@angular/core';
import { User } from '../models/User.models';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7042/api/Auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser: any = null;
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

  // Update user profile
  updateProfile(userId: number, formData: FormData): Observable<User> {
    return this.http
      .put<User>(`https://localhost:7042/api/Users/profile`, formData)
      .pipe(
        tap((updatedUser) => {
          // Optional: Update local storage or state management
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }),
        catchError((error) => {
          console.error('Error updating profile', error);
          throw error;
        })
      );
  }
  getToken(): string {
    try {
      const currentUserStr = localStorage.getItem('currentUser');
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr);
        if (currentUser?.taken) {
          return currentUser.taken;
        }
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
      return '';
    }
  }
  // auth.service.ts
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
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
