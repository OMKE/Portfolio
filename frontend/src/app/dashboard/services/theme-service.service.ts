import { getUrl } from './../../core/utilities/api.utils';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme } from '../models/Theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeServiceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Theme[]> {
    return this.http.get<Theme[]>(getUrl('project-themes'));
  }
}
