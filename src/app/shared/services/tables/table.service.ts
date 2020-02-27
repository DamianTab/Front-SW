import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/forms/water/request.service'
import { Observable} from "rxjs";

@Injectable()
export class TableService {

  constructor(private reqService: RequestService) { }

  getData(dataType: string): Observable<any> {

    let result;

    if (dataType === "valves") {
      let timestamps: string[] = [];
      let valve1: string[] = [];
      let valve2: string[] = [];
      let valve3: string[] = [];

      return new Observable(observer => {
        this.reqService.getValveAllStates(1, 1).subscribe(data => {
          data.forEach(elem => {
            let date = new Date(elem.timestamp);
            timestamps.push(`${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`);
            valve1.push(elem.valve_open ? 'otwarty' : 'zamknięty');
          });
          this.reqService.getValveAllStates(1, 2).subscribe(data => {
            data.forEach(elem => valve2.push(elem.valve_open ? 'otwarty' : 'zamknięty'));
            this.reqService.getValveAllStates(1, 3).subscribe(data => {
              data.forEach(elem => valve3.push(elem.valve_open ? 'otwarty' : 'zamknięty'));
              result = { 'Czas': timestamps, 'Y1': valve1, 'Y2': valve2, 'Y3': valve3 };
              console.log(result);
              observer.next(result);
              observer.complete();
            });
          });
        });
      });
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
}
