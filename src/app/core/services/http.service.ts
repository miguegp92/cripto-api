import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  request: string = environment.apiURL;
  constructor(private http: HttpClient) { }

  public getMethod(path: any, options?: any): Observable<any>  {
    const url = `${this.request}/${path}`;
    return this.http.get(url, options);
   
  }

  public postMethod(path: any, params?: any): Observable<any>  {
    const url = `${this.request}/${path}`
    return this.http.post(url, params);
  }

  public putMethod(path: any, params?: any): Observable<any>  {
    const url = `${this.request}/${path}`
    return this.http.put(url, params);
  }

  public deleteMethod(path: any, params?: any): Observable<any>  {
    const url = `${this.request}/${path}`
    return this.http.delete(url, params);
  }


}
