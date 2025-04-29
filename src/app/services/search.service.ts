import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchData } from '../models/SearchData.models';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'https://airbnbclone.runasp.net/api/Property/search';

  constructor(private http: HttpClient) {}

  searchProperties(searchData) {
    return this.http.post<Property[]>(this.apiUrl, searchData);
  }
}
