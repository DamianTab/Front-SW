import { Injectable } from '@angular/core';
import {RequestService} from '../request/request.service';
import { Observable } from 'rxjs';
import { ContainerState } from '../../models/container-state';
import {HttpClient} from '@angular/common/http';
import {Page} from '../../../models/page';

export class ContainerRecord {

  constructor(time: string, value: number) {
    this.time = time;
    this.value = value;
  }

  time: string;
  value: number;
}

@Injectable()
export class ChartService {

  private result: ContainerRecord[] = [];

  constructor(private reqService: RequestService) { }

  getData(interval: ChartService.MetaData): Observable<any> {
    return new Observable(subscriber => {
    this.reqService.getStates(`/water/1/container/1/states/`, 10, null)
        .subscribe((data: any[]) => {
          const result: ContainerRecord[] = [];
          data.forEach(elem => {
            let date = new Date(elem.time);

            result.push(new ContainerRecord(`${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`);
          ));
            result.push(`${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`);

            subscriber.next();
                subscriber.complete();
          });
        });
    });
  }

temperature(meta: ChartService.MetaData) {
    return {
      x: [1, 2, 3],
      y: [4, 5, 6]
    };
    // return this.retrieveData('temperature')
  }

  oxygen(meta: ChartService.MetaData) {
    this.getData(meta).subscribe( data => data );
  }
    // return {
    //   x: [1, 2, 3],
    //   y: [4, 5, 6]
    // };


  redox(meta: ChartService.MetaData) {
    return {
      x: [1, 2, 3],
      y: [4, 5, 6]
    };
    // return this.retrieveData('redox')
  }

  pH(meta: ChartService.MetaData) {
    return {
      x: [1, 2, 3],
      y: [4, 5, 6]
    };
    // return this.retrieveData('pH')
  }
}

export namespace ChartService {
  export interface MetaData {
    begin: Date;
    end: Date;
  }

  export interface Data {
    x: number[]|string[]|Date[];
    y: number[];
  }
}
