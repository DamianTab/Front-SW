import { Injectable } from '@angular/core';
import {BehaviorSubject, observable, Observable} from 'rxjs';
import { Page } from 'src/app/models/page';
import { Valve } from 'src/app/models/water/valve';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private result: Valve[] = [];

  constructor(private httpClient: HttpClient) { }

  getValveStates(stationId: number, valveId: number, page: string): Observable<null> {
    return new Observable(subscriber => {
      this.httpClient.get<Page<Valve>>(page === 'smth' ? `/water/${stationId}/valve/${valveId}/states/` : page).subscribe(data => {
        this.result.push(...data.results);
        if (data.next !== null) {
          this.getValveStates(stationId, valveId, data.next.split('00')[1]).subscribe(()=>{}, ()=>{}, () => {
            console.log("One of them completed");
            subscriber.complete();
          });
        } else {
          console.log("last one completed");
          subscriber.complete();
        }
      });
    })
  }

  getValveAllStates(stationId: number, valveId: number): Observable<Valve[]> {
    this.result = [];
    return new Observable(subscriber => {
      this.getValveStates(stationId, valveId, 'smth').subscribe(()=>{}, ()=>{}, () => {
        subscriber.next(this.result);
        subscriber.complete();
      })
    })
  }
}
