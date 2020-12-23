import { getUrl } from './../utilities/api.utils';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkImage } from '../store/work-image/work-image.model';

@Injectable({
  providedIn: 'root'
})
export class WorkImageService {

  constructor(private http: HttpClient) { }

  getAll(workId: number): Observable<WorkImage[]> {
    return this.http.get<WorkImage[]>(getUrl(`projects/${workId}/images`));
  }
}
