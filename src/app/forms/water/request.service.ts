import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page';
import { Valve, ValveData } from 'src/app/models/water/valve';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly url: string = '/water/';

  constructor(private httpClient: HttpClient) { }

  getValveStates(stationId: number, valveId: number): Observable<Page<Valve>> {
    console.log(this.url+stationId+'/valve/'+valveId+'/states/');
    return this.httpClient.get<Page<Valve>>(this.url+stationId+'/valve/'+valveId+'/states/');
  }

  async getValvesStates(stationId: number): Promise<any> {
    let timestamps: string[] = [];
    let valve1: boolean[] = [];
    let valve2: boolean[] = [];
    let valve3: boolean[] = [];
    this.getValveStates(stationId, 1).subscribe(data => {
      data.results.forEach(elem => {
        timestamps.push(elem.timestamp);
        valve1.push(elem.valve_open);
      })});
    this.getValveStates(stationId, 2).subscribe(data => {
      data.results.forEach(elem => valve2.push(elem.valve_open))});
    this.getValveStates(stationId, 3).subscribe(data => {
      data.results.forEach(elem => valve3.push(elem.valve_open))});
    return {timestamp: timestamps, Y1: valve1, Y2: valve2, Y3: valve3};
  }
}
