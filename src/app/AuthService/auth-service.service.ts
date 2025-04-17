import { Injectable } from '@angular/core';
import { User } from '../models/User.models';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7042/api/Auth';
  currentUser: any = null;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        console.log(response);
        localStorage.setItem('currentUser', JSON.stringify(response));
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

  updateProfile(userId: number, formData: FormData): Observable<User> {
    return this.http
      .put<User>(`https://localhost:7042/api/Users/profile`, formData)
      .pipe(
        tap((updatedUser) => {
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

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    console.log(token);
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

  isAuthenticated() {
    return !!this.getToken();
  }
  logout() {
    localStorage.removeItem('currentUser');
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
