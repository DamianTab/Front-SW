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

  getValveStates(stationId: number, valveId: number): Observable<Page<Valve>> {
    return this.httpClient.get<Page<Valve>>(`/water/${stationId}/valve/${valveId}/states/`);
  }

}
