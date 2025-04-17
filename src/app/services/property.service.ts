import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Property } from '../models/property.model';
import { AuthService } from '../AuthService/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'https://localhost:7042/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHostProperties() {
    const token = this.authService.getToken();
    console.log('my token' + token);
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    return this.http.get(`${this.apiUrl}/Property/host-properties`, {
      headers,
    });
  }

  getPropertyById(id: string) {
    return this.http.get<Property>(
      `${this.apiUrl}/Property/get-one-property/${id}`
    );
  }

  createProperty(property: FormData) {
    property.forEach((value, key) => {
      console.log('Availabilities in FormData:', value, key);
    });
    return this.http.post<Property>(
      `${this.apiUrl}/Property/create-property`,
      property
    );
  }

  updateProperty(id: number, property: FormData) {
    return this.http.put<Property>(`${this.apiUrl}/Property/${id}`, property);
  }
  deletePropertyImage(propertyId: string, ImageId: string) {
    const headers = new HttpHeaders({
      Authorization: `${this.authService.getToken()}`,
    });

    return this.http
      .delete<void>(
        `${this.apiUrl}/PropertyImage/deleteImageFromProperty/${propertyId}/${ImageId}`,
        { headers }
      )
      .pipe(
        catchError((error) => {
          let errorMessage = 'Failed to delete image';
          if (error.status === 404) {
            errorMessage = 'Image not found';
          } else if (error.status === 403) {
            errorMessage = 'You are not authorized to delete this image';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }
  deleteProperty(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/delete-property/${id}`);
  }
}
