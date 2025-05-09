import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Property } from '../models/property.model';
import { AuthService } from '../AuthService/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'https://airbnbclone.runasp.net/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHostProperties(): Observable<Property[]> {
    const headers = this.authService.getAuthHeaders();

    return this.http.get<Property[]>(
      `${this.apiUrl}/Property/host-properties`,
      {
        headers,
      }
    );
  }
  getPropertiesByIds() {}
  getPropertyByCategories(categoryId: string) {
    return this.http.get<Property>(
      `${this.apiUrl}/Property/ByCategory/${categoryId}`
    );
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
      Authorization: `${this.authService.getAuthHeaders()}`,
    });

    return this.http
      .delete(
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
  getPropertyAvailability(id: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/Property/getAvailabilityForPropertty?id=${id}`
    );
  }
  deleteProperty(id: string) {
    return this.http.delete(`${this.apiUrl}/Property/delete-property/${id}`);
  }
}
