// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {

//   constructor() { }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private apiUrl = 'https://localhost:7042/api/chat'; 
  private apiUrl ='https://localhost:7042/api/Chatbot/message';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { text: message });
  }
}
