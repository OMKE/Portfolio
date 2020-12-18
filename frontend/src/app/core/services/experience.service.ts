import { getUrl } from '../utilities';
import { Experience } from './../store/experience/experience.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Experience[]> {
    return this.http.get<Experience[]>(getUrl('experiences'));
  }
}
