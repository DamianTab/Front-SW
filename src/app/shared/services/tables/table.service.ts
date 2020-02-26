import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/forms/water/request.service';

@Injectable()
export class TableService {
  private readonly url = 'service/table';

  constructor(private reqService: RequestService) { }

  async getData(dataType: string): Promise<any> {
    // const data = []
    // for(let i=0; i<1000; i++) {
    //     data.push(i)
    // }

    // let data;
    // await this.http.get(`${this.url}/${dataType}`).subscribe((recv) => data = recv)
    // return data
    let result;

    if (dataType === "valves") {
      let timestamps: string[] = [];
      let valve1: string[] = [];
      let valve2: string[] = [];
      let valve3: string[] = [];
      await this.reqService.getValveStates(1, 1).toPromise().then(data => {
        console.log(data);
        data.results.forEach(elem => {
          let date = new Date(elem.timestamp);
          timestamps.push(`${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`);
          valve1.push(elem.valve_open ? 'otwarty' : 'zamknięty');
        });
        return this.reqService.getValveStates(1, 2).toPromise().then(data => {
          console.log(data);
          data.results.forEach(elem => valve2.push(elem.valve_open ? 'otwarty' : 'zamknięty'));
          return this.reqService.getValveStates(1, 3).toPromise().then(data => {
            console.log(data);
            data.results.forEach(elem => valve3.push(elem.valve_open ? 'otwarty' : 'zamknięty'));
            result = { 'Czas': timestamps, 'Y1': valve1, 'Y2': valve2, 'Y3': valve3 };
          });
        });
      });
    }

    console.log(result);
    return result;

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
