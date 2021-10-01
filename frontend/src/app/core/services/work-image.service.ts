import { getUrl } from './../utilities/api.utils';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkImage } from '../store/work-image/work-image.model';

export interface AddWorkImageRequest {
  description: string;
  image: string;
}

export interface AddWorkImageResponse {
  message: string;
  data: WorkImage;
}

export interface UpdateWorkImageRequest {
  image?: string;
  description: string;
}

export interface UpdateWorkImageResponse {
  message: string;
  data: WorkImage;
}

@Injectable({
  providedIn: 'root',
})
export class WorkImageService {
  constructor(private http: HttpClient) {}

  getAll(workId: number): Observable<WorkImage[]> {
    return this.http.get<WorkImage[]>(getUrl(`projects/${workId}/images`));
  }

  add(
    workId: number,
    data: AddWorkImageRequest
  ): Observable<AddWorkImageResponse> {
    return this.http.post<AddWorkImageResponse>(
      getUrl(`projects/${workId}/images`),
      data
    );
  }

  update(
    workId: number,
    workImageId: number,
    updateWorkImageRequest
  ): Observable<UpdateWorkImageResponse> {
    return this.http.put<UpdateWorkImageResponse>(
      getUrl(`projects/${workId}/images/${workImageId}`),
      updateWorkImageRequest
    );
  }
  delete(workId: number, workImageId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      getUrl(`projects/${workId}/images/${workImageId}`)
    );
  }
}
