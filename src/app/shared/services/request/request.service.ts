import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page';
import { HttpClient } from '@angular/common/http';
import {TableComponent} from "../../components/table/table.component";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }

  //pageMaxNumber - ilość stron danych do pobrania
  //nextPage - obiekt przechowujący endpoint do ładowania kolejnych danych w tabelach

  getStates(endpoint: string, pageMaxNumber: number, nextPage?: any): Observable<any> {
    return new Observable(subscriber => {
      this.httpClient.get<Page<any>>(endpoint).subscribe(data => {
        if (data.next !== null && --pageMaxNumber > 0) {
          this.getStates(data.next.split('00')[1], pageMaxNumber, nextPage).subscribe(childData => {
            subscriber.next(data.results.concat(childData));
            subscriber.complete();
          });
        } else {
          if (nextPage) {
            data.next === null ? nextPage['endpoint'] = null : nextPage['endpoint'] = data.next.split('00')[1];
          }
          subscriber.next(data.results);
          subscriber.complete();
        }
      });
    })
  }

  setOnOff(endpoint: string, body: any): Observable<any> {
    return this.httpClient.post<Observable<any>>(endpoint, body);
  }
}
