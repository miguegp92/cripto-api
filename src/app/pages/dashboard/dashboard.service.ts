import { Portfolio, Line, Coin } from './../../core/config/request.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './../../core/services/http.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService extends HttpService {

  constructor(http: HttpClient) {
    super(http);
  }

  get(url: string): Observable<any> {
    return this.getMethod(url);
  }

  post(url: string): Observable<any> {
    return this.postMethod(url);
  }
}
