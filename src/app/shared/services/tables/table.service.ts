import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/forms/water/request.service'
import { Observable } from "rxjs";

@Injectable()
export class TableService {

  constructor(private reqService: RequestService) { }

  getData(dataType: string, limit: number = 1): Observable<any> {
    let stationNumber = 1; //TODO dynamiczne pobieranie numeru stacji
    let valvesCounter = 3; //TODO dynamiczne pobieranie ilości zaworów
    let pumpsCounter = 3;  //TODO dynamiczne pobieranie ilości pomp

    if (dataType === "valves") return this.getValvesData(stationNumber, valvesCounter, valvesCounter, limit);
    if (dataType === "pumps") return this.getPumpsData(stationNumber, pumpsCounter, pumpsCounter, limit);

    // return {
    //   'A': [1, 2, 'EXAMPLE_STRING', 2, 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING'],
    //   'B': [2, 3, 'EXAMPLE_STRING', 2, 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING'],
    //   'C': [3, 1, 'EXAMPLE_STRING', 2, 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING', 'EXAMPLE_STRING']


      // 'Kolumna 1': data,
      // 'Kolumna 2': Array.from(data).reverse(),
      // 'Kolumna 3': data.map(val => val + '^2'),
      // 'Kolumna 4': data.map(val => val + '^2').reverse()
    // }
  }


  getValvesData(stationId: number, totalValveCounter: number, valveLimit: number, pageLimit: number): Observable<any> {
    return new Observable(subscriber => {
      this.reqService.getStates(`/water/${stationId}/valve/${valveLimit--}/states/`, pageLimit).subscribe(data => {
        if (valveLimit > 0) {
          this.getValvesData(stationId, totalValveCounter, valveLimit, pageLimit).subscribe(childData => {
            childData[`Y${valveLimit+1}`] = [];
            data.forEach(elem => {
              childData[`Y${valveLimit+1}`].push(elem.valve_open ? 'otwarty' : 'zamknięty');
            });
            subscriber.next(childData);
            subscriber.complete();
          })
        } else {
          let result = {"Czas": []};
          result[`Y${valveLimit+1}`] = [];
          data.forEach(elem => {
            let date = new Date(elem.timestamp);
            result["Czas"].push(`${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`);
            result[`Y${valveLimit+1}`].push(elem.valve_open ? 'otwarty' : 'zamknięty');
          })
          subscriber.next(result);
          subscriber.complete();
        }
      });
    });
  }

  getPumpsData(stationId: number, totalPumpCounter: number, pumpLimit: number, pageLimit: number): Observable<any> {
    return new Observable(subscriber => {
      this.reqService.getStates(`/water/${stationId}/pump/${pumpLimit--}/states/`, pageLimit).subscribe(data => {
        if (pumpLimit > 0) {
          this.getValvesData(stationId, totalPumpCounter, pumpLimit, pageLimit).subscribe(childData => {
            childData[`P${pumpLimit+1}`] = [];
            data.forEach(elem => {
              childData[`P${pumpLimit+1}`].push(elem.pump_state ? 'włączona' : 'wyłączona');
            });
            subscriber.next(childData);
            subscriber.complete();
          })
        } else {
          let result = {"Czas": []};
          result[`P${pumpLimit+1}`] = [];
          data.forEach(elem => {
            let date = new Date(elem.timestamp);
            result["Czas"].push(`${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`);
            result[`P${pumpLimit+1}`].push(elem.pump_state ? 'włączona' : 'wyłączona');
          })
          subscriber.next(result);
          subscriber.complete();
        }
      });
    });
  }
}
