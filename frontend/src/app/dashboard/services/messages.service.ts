import { tap } from 'rxjs/operators';
import { getUrl } from './../../core/utilities/api.utils';
import { Observable, of } from 'rxjs';
import { TransferStateService } from './../../core/services/transfer-state.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/Message';


const transferStateKey = 'messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient, private transferStateService: TransferStateService) { }

  getAll(): Observable<Message[]> {
    if (!this.transferStateService.has(transferStateKey)) {
      return this.http
        .get<Message[]>(getUrl('messages'))
        .pipe(
          tap(res => this.transferStateService.set(transferStateKey, res))
        );
    } else {
      return of(this.transferStateService.get(transferStateKey));
    }
  }
  deleteMessage(id: number): Observable<{ message: string}> {
    return this.http.delete<{ message: string}>(getUrl(`messages/${id}`));
  }
}
