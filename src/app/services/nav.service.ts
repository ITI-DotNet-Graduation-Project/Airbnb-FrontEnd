import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private apiUrl =
    'https://airbnbclone.runasp.net/api/PropertyCategory/getallCategories';
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(`${this.apiUrl}`);
  }
}
