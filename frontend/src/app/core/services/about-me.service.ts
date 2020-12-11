import { getUrl } from './../utilities/api-utils';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AboutMe } from '../store/about-me/about-me.model';


@Injectable({
  providedIn: 'root'
})
export class AboutMeService {

  constructor(private http: HttpClient){}


  get = (): Observable<AboutMe> => {
    return this.http.get<AboutMe>(getUrl('about-me'));
  }


}
