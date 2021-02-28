import { ExperienceResponse } from './../store/experience/experience.response';
import { ExperienceRequest } from './../store/experience/experience.request';
import { tap } from 'rxjs/operators';
import { TransferStateService } from './transfer-state.service';
import { getUrl } from '../utilities';
import { Experience } from './../store/experience/experience.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const transferStateKey = 'experiences';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor(
    private http: HttpClient,
    private transferStateService: TransferStateService
  ) {}

  getAll(): Observable<Experience[]> {
    if (!this.transferStateService.has(transferStateKey)) {
      return this.http
        .get<Experience[]>(getUrl('experiences'))
        .pipe(
          tap((res) => this.transferStateService.set(transferStateKey, res))
        );
    } else {
      return of(this.transferStateService.get(transferStateKey));
    }
  }

  add(data: ExperienceRequest): Observable<ExperienceResponse> {
    return this.http.post<ExperienceResponse>(getUrl('experiences'), data);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(getUrl(`experiences/${id}`));
  }
}
