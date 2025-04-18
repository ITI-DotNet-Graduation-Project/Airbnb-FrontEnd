import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUrl = 'https://localhost:7042/api';

  constructor(private http: HttpClient) {}

  getPropertyById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/Property/get-one-property/${id}`);
  }

  getCards(categoryId?: number) {
    console.log(categoryId);
    if (categoryId !== null && categoryId !== undefined) {
      return this.http.get<any[]>(
        `${this.apiUrl}/Property/ByCategory/${categoryId}`
      );
    } else return this.http.get<any[]>(`${this.apiUrl}/Property`);
  }
  getCardsPaginated(page: number = 1, limit: number = 8) {
    return this.http.get<any[]>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
}
