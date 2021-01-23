import { getUrl } from './../core/utilities/api.utils';
import { LoginResponseSuccess, LoginResponseFailure } from './models/auth.response';
import { Observable } from 'rxjs';
import { LoginRequest } from './models/auth.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<LoginResponseSuccess | LoginResponseFailure> {
    return this.http.post<LoginResponseSuccess|LoginResponseFailure>(getUrl('auth/login'), data);
  }
}
