import { getUrl, ApiResponse } from '../utilities';
import { Observable } from 'rxjs';
import { Message } from './../store/message/message.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }


  sendMessage(message: Message): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(getUrl('messages'), message);
  }
}
