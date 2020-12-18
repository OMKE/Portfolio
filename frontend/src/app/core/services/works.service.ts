import { getUrl } from '../utilities';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Work } from '../store/works/work.model';

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Work[]> {
    return this.http.get<Work[]>(getUrl('projects'));
  }

  getOne(id: number): Observable<Work> {
    return this.http.get<Work>(getUrl(`projects/${id}`));
  }
}
