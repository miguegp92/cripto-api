import { Portfolio, Coin } from './../../core/config/request.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './../../core/services/http.service';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService extends HttpService {

  private store: any = {};

  constructor(http: HttpClient) {
    super(http);
  }

  get(path: string): Observable<any> {
    return this.getMethod(path).pipe(map( response => {
      this.store[path] = response.reduce(  (store: any, element: Coin | Portfolio | any) => {
        if (path ==='coins'){
           this.getCoinValue(element.acronym, 'EUR').subscribe( value =>  element.valueCoin = value )
        }
        store[element.id] = element;
        return store;
      }, {});
      return response
    }));
  }

  post(path: string): Observable<any> {
    return this.postMethod(path);
  }

  getCoinValue(fsym: string, tsyms: string = 'EUR'): Observable<any> {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${fsym}&tsyms=${tsyms}`
    return this.http.get(url).pipe(map((response: any) => {debugger; return response[tsyms]} ))
  }

  getStore(path: string, id?: number){
    return id ? this.store[path][id] : this.store[path];
  }
}
