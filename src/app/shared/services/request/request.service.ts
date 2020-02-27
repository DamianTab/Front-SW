import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }

  getStates(endpoint: string, pageMaxNumber: number): Observable<any> {
    return new Observable(subscriber => {
      this.httpClient.get<Page<any>>(endpoint).subscribe(data => {
        if (data.next !== null && --pageMaxNumber > 0) {
          this.getStates(data.next.split('00')[1], pageMaxNumber).subscribe(childData => {
            subscriber.next(data.results.concat(childData));
            subscriber.complete();
          });
        } else {
          subscriber.next(data.results);
          subscriber.complete();
        }
      });
    })
  }
}
