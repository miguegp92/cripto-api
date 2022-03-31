import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class DetailService  extends HttpService{

  constructor(http: HttpClient) {
    super(http);
  }

  getData(path: string, id: number): Observable<any> {
    const fullPath = `${path}/${id}`
    return this.getMethod(fullPath);
  }

  postsData(options: any): Observable<any> {
    const fullPath = `lines`
    return this.postMethod(fullPath, options);
  }

  getLines(id: number){
    return this.getMethod(`portfolios/${id}/lines?_expand=coin`).pipe(
      map( result =>{
        const response = result.map( (line: any) => {
          const {id, amount, coinId} = line
          const {name, acronym} = line.coin
  
          return {id, amount, coinId, name, acronym};
        })
        return response
      })
    );
  }
}
