import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { Observable } from 'rxjs';

@Injectable()
export class ChartService {
  constructor(private reqService: RequestService) {}

  public waterLevelC1(
    meta: ChartService.MetaData,
    actualData: ChartService.Data = null,
    update: boolean = false
  ) {
    const url = '/water/1/container/1/states/';
    if (update) {
      return this.updateData(meta, url, actualData);
    } else {
      return this.getInitialData(meta, url);
    }
  }

  public temperature(meta: ChartService.MetaData) {
    return {
      x: [1, 2, 3],
      y: [4, 5, 6]
    };
    // return this.retrieveData('temperature')
  }

  public oxygen(meta: ChartService.MetaData) {
    return {
      x: [1, 2, 3],
      y: [4, 5, 6]
    };
  }

  public redox(meta: ChartService.MetaData) {
    return {
      x: [1, 2, 3],
      y: [4, 5, 6]
    };
    // return this.retrieveData('redox')
  }

  public pH(meta: ChartService.MetaData) {
    return {
      x: [1, 2, 3],
      y: [4, 5, 6]
    };
    // return this.retrieveData('pH')
  }

  private getInitialData(
    interval: ChartService.MetaData,
    url: string
  ): Observable<any> {
    let newData: ChartService.Data = { x: [], y: [], timestamps: [] };
    return new Observable(subscriber => {
      this.reqService
        .getStates(
          `${url}?from=${interval.begin.toISOString()}&to=${interval.end.toISOString()}`,
          Infinity,
          null
        )
        .subscribe((data: any[]) => {
          data.forEach(elem => {
            const date = new Date(elem.timestamp);
            newData.timestamps.push(date.getTime());
            newData.x.push(`${date.getUTCFullYear()}-${date.getUTCMonth() +
              1}-${date.getUTCDate()}
               ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`);
            newData.y.push(elem.container_state);
          });
          newData = this.reverseData(newData);
          subscriber.next(newData);
          subscriber.complete();
        });
    });
  }

  private updateData(
    interval: ChartService.MetaData,
    url: string,
    actualData: ChartService.Data
  ): Observable<any> {
    let newData: ChartService.Data = { x: [], y: [], timestamps: [] };
    return new Observable(subscriber => {
      this.reqService.getStates(url, 1, null).subscribe((data: any[]) => {
        data.forEach(elem => {
          const date = new Date(elem.timestamp);
          if (date.getTime() > actualData.timestamps[actualData.x.length - 1]) {
            newData.x.push(`${date.getUTCFullYear()}-${date.getUTCMonth() +
              1}-${date.getUTCDate()}
                 ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`);
            newData.timestamps.push(date.getTime());
            newData.y.push(elem.container_state);
          } else {
            newData = this.removeOverdueData(newData, interval);
            subscriber.next(this.concatNewData(newData, actualData));
            subscriber.complete();
          }
        });
      });
    });
  }

  private concatNewData(
    newData: ChartService.Data,
    currentData: ChartService.Data
  ): ChartService.Data {
    return {
      x: currentData.x.concat(newData.x.reverse()),
      y: currentData.y.concat(newData.y.reverse()),
      timestamps: currentData.timestamps.concat(newData.timestamps.reverse())
    };
  }

  private reverseData(data: ChartService.Data): ChartService.Data {
    return {
      x: data.x.reverse(),
      y: data.y.reverse(),
      timestamps: data.timestamps.reverse()
    };
  }

  private removeOverdueData(
    data: ChartService.Data,
    interval: ChartService.MetaData
  ) {
    for (let i: number = data.x.length - 1; i >= 0; i--) {
      if (data.timestamps[i] >= interval.begin.getTime()) {
        data.x = data.x.slice(i);
        data.y = data.y.slice(i);
        data.timestamps = data.timestamps.slice(i);
        break;
      }
    }
    return data;
  }
}

// tslint:disable-next-line: no-namespace
export namespace ChartService {
  export interface MetaData {
    begin: Date;
    end: Date;
  }

  export interface Data {
    timestamps: number[];
    x: string[];
    y: number[];
  }
}
