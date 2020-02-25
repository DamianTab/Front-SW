import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/forms/water/request.service';

@Injectable()
export class TableService {
    private readonly url = 'service/table'

    constructor(private reqService: RequestService) { }

    async getData(dataType: string): Promise<any> {
        // const data = []
        // for(let i=0; i<1000; i++) {
        //     data.push(i)
        // }

        // let data;
        // await this.http.get(`${this.url}/${dataType}`).subscribe((recv) => data = recv)
        // return data
        if (dataType === "valves") {
          let timestamps: string[] = [];
          let valve1: boolean[] = [];
          let valve2: boolean[] = [];
          let valve3: boolean[] = [];
          this.reqService.getValveStates(1, 1).subscribe(data => {
            console.log(data);
            data.results.forEach(elem => {
              timestamps.push(elem.timestamp);
              valve1.push(elem.valve_open);
            });
            this.reqService.getValveStates(1, 2).subscribe(data => {
              console.log(data);
              data.results.forEach(elem => valve2.push(elem.valve_open));
              this.reqService.getValveStates(1, 3).subscribe(data => {
                console.log(data);
                data.results.forEach(elem => valve3.push(elem.valve_open));
                let result = { 'Czas' : timestamps, 'Y1' : valve1, 'Y2' : valve2, 'Y3' : valve3 };
                return result;
              });
            });
          });
        }

        return {
            'A': [1, 2, 'EXAMPLE_STRING', 2, 'EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING'],
            'B': [2, 3, 'EXAMPLE_STRING', 2, 'EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING'],
            'C': [3, 1, 'EXAMPLE_STRING', 2,'EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING','EXAMPLE_STRING']


            // 'Kolumna 1': data,
            // 'Kolumna 2': Array.from(data).reverse(),
            // 'Kolumna 3': data.map(val => val + '^2'),
            // 'Kolumna 4': data.map(val => val + '^2').reverse()
        }
    }
}
