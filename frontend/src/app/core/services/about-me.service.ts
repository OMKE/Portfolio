import { tap } from 'rxjs/operators';
import { TransferStateService } from './transfer-state.service';
import { getUrl } from '../utilities';
import { environment } from './../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AboutMe } from '../store/about-me/about-me.model';
import {AboutMeRequest} from "../store/about-me/about-me.request";


const transferStateKey = 'about-me';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {

  constructor(private http: HttpClient, private transferStateService: TransferStateService){}


  get(): Observable<AboutMe> {
    if (!this.transferStateService.has(transferStateKey)) {
      return this.http
        .get<AboutMe>(getUrl('about-me'))
        .pipe(
          tap(res => this.transferStateService.set(transferStateKey, res))
        );
    } else {
      return of(this.transferStateService.get(transferStateKey));
    }
  }

  update(data: AboutMeRequest): Observable<{ message:string, data: AboutMe}> {
      return this.http.post<{ message:string, data: AboutMe}>(getUrl('about-me'), data);
  }


}
