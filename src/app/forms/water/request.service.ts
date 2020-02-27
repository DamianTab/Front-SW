import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page';
import { Valve } from 'src/app/models/water/valve';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }

  getValveStates(endpoint: string, limit: number): Observable<any> {
    return new Observable(subscriber => {
      this.httpClient.get<Page<any>>(endpoint).subscribe(data => {
        if (data.next !== null && --limit > 0) {
          this.getValveStates(data.next.split('00')[1], limit).subscribe(childData => {
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
