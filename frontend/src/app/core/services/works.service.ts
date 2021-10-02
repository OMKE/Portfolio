import { WorkResponse } from './../store/works/work.response';
import { WorkRequest } from './../store/works/work.request';
import { WorkImage } from './../store/work-image/work-image.model';
import { getUrl } from '../utilities';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Work } from '../store/works/work.model';

@Injectable({
  providedIn: 'root',
})
export class WorksService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Work[]> {
    return this.http.get<Work[]>(getUrl('projects'));
  }

  getOne(id: number): Observable<Work> {
    return this.http.get<Work>(getUrl(`projects/${id}`));
  }

  getImages(workId: number): Observable<WorkImage> {
    return this.http.get<WorkImage>(getUrl(`projects/${workId}/images`));
  }

  addWork(data: WorkRequest): Observable<WorkResponse> {
    return this.http.post<WorkResponse>(getUrl('projects'), data);
  }

  updateWork(workId: number, data: WorkRequest): Observable<WorkResponse> {
    return this.http.put<WorkResponse>(getUrl(`projects/${workId}`), data);
  }

  deleteWork(workId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(getUrl(`projects/${workId}`));
  }
}
