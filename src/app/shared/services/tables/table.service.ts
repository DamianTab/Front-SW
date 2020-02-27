import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/forms/water/request.service'
import { Observable } from "rxjs";

@Injectable()
export class TableService {

  constructor(private reqService: RequestService) { }

  getData(dataType: string, limit: number = 1): Observable<any> {
    if (dataType === "valves") {
      let stationNumber = 1; //TODO dynamiczne pobieranie numeru stacji
      let valvesCounter = 3; //TODO dynamiczne pobieranie ilości zaworów

      return this.getSingleValveData(stationNumber, valvesCounter, valvesCounter, limit);
    }

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


  getSingleValveData(stationId: number, totalValveCounter: number, valveLimit: number, pageLimit: number): Observable<any> {
    return new Observable(subscriber => {
      this.reqService.getValveStates(`/water/${stationId}/valve/${valveLimit--}/states/`, pageLimit).subscribe(data => {
        if (valveLimit > 0) {
          this.getSingleValveData(stationId, totalValveCounter, valveLimit, pageLimit).subscribe(childData => {
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
}
