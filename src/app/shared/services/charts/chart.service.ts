import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { Observable } from 'rxjs';

@Injectable()
export class ChartService {
  constructor(private reqService: RequestService) {}

  private static concatNewData(
    newData: ChartService.Data,
    currentData: ChartService.Data
  ): ChartService.Data {
    return {
      y: currentData.y.concat(newData.y.reverse()),
      timestamps: currentData.timestamps.concat(newData.timestamps.reverse())
    };
  }

  private static reverseData(data: ChartService.Data): ChartService.Data {
    return {
      y: data.y.reverse(),
      timestamps: data.timestamps.reverse()
    };
  }

  private static removeOverdueData(
    data: ChartService.Data,
    interval: ChartService.MetaData
  ) {
    for (let i: number = data.y.length - 1; i >= 0; i--) {
      if (data.timestamps[i].getTime() >= interval.begin.getTime()) {
        data.y = data.y.slice(i);
        data.timestamps = data.timestamps.slice(i);
        break;
      }
    }
    return data;
  }

  private getInitialData(
    interval: ChartService.MetaData,
    url: string
  ): Observable<any> {
    let newData: ChartService.Data = { y: [], timestamps: [] };
    return new Observable(subscriber => {
      this.reqService
        .getMultipleStatesPages(
          url,
          Infinity,
          null, {datetime: {from: interval.begin.toISOString(), to: interval.end.toISOString()}}
        )
        .subscribe((data: any[]) => {
          data.forEach(elem => {
            newData.timestamps.push(new Date(elem.timestamp));
            newData.y.push(elem.container_state);
          });
          newData = ChartService.reverseData(newData);
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
    let newData: ChartService.Data = { y: [], timestamps: [] };
    const previousTime: number = actualData.timestamps.length === 0 ? interval.begin.getTime()
      : actualData.timestamps[actualData.timestamps.length - 1].getTime();
    return new Observable(subscriber => {
      this.reqService.getSingleStatesPage(url).subscribe(data => {
        data.forEach(elem => {
          const date = new Date(elem.timestamp);
          if (date.getTime() > previousTime) {
            newData.timestamps.push(date);
            newData.y.push(elem.container_state);
          } else {
            newData = ChartService.removeOverdueData(newData, interval);
            subscriber.next(ChartService.concatNewData(newData, actualData));
            subscriber.complete();
          }
        });
      });
    });
  }

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
}

// tslint:disable-next-line: no-namespace
export namespace ChartService {
  export interface MetaData {
    begin: Date;
    end: Date;
  }

  export interface Data {
    timestamps: Date[];
    y: number[];
  }
}
