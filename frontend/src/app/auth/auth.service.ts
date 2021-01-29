import { getUrl } from './../core/utilities/api.utils';
import { LoginResponseSuccess, LoginResponseFailure } from './models/auth.response';
import { Observable } from 'rxjs';
import { LoginRequest } from './models/auth.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user.model';


const TOKEN_KEY = 'oi';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private token: string = null;


  login(data: LoginRequest): Observable<LoginResponseSuccess | LoginResponseFailure> {
    return this.http.post<LoginResponseSuccess|LoginResponseFailure>(getUrl('auth/login'), data);
  }
  logout(): Observable<any> {
    return this.http.post<any>(getUrl('auth/logout'), null);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(getUrl('auth/me'));
  }

  getUserFromLS(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  setUserToLS(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setToken(response: LoginResponseSuccess): void {
    const token = `${response.token_type.charAt(0).toUpperCase() + response.token_type.slice(1)} ${response.access_token}`;
    this.token = token;
    localStorage.setItem(TOKEN_KEY, this.token);
  }

  getToken(): string {
    if (!this.token) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        this.token = token;
        return token;
      }
    }
    return this.token;
  }

  refreshToken(): Observable<LoginResponseSuccess | LoginResponseFailure> {
    return this.http.post<LoginResponseSuccess | LoginResponseFailure>(getUrl('auth/refreh'), null);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }


}
