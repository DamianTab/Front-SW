import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private reqService: RequestService) { }

  public getData(dataType: string, pageMaxNumber: number, nextPage: any): Observable<any> {
    let stationNumber = 1; //TODO dynamiczne pobieranie numeru stacji
    let valvesCounter = 3; //TODO dynamiczne pobieranie ilości zaworów
    let pumpsCounter = 4;  //TODO dynamiczne pobieranie ilości pomp
    let containersCounter = 5;  //TODO dynamiczne pobieranie ilości zbiorników

    if (dataType === 'valve') return this.getElementsData('valve', stationNumber, valvesCounter, valvesCounter, pageMaxNumber, nextPage);
    if (dataType === 'pump') return this.getElementsData('pump', stationNumber, pumpsCounter, pumpsCounter, pageMaxNumber, nextPage);
    if (dataType === 'container') return this.getElementsData('container', stationNumber, containersCounter, containersCounter, pageMaxNumber, nextPage);
  }

  private getElementsData(dataType: string, stationId: number, totalElementCounter: number, elementLimit: number, pageMaxNumber: number, nextPage: any): Observable<any> {
    return new Observable(subscriber => {
      this.reqService.getMultipleStatesPages(`/water/${stationId}/${dataType}/${elementLimit--}/states/`, pageMaxNumber, nextPage).subscribe(data => {
        if (elementLimit > 0) {
          this.getElementsData(dataType, stationId, totalElementCounter, elementLimit, pageMaxNumber, nextPage).subscribe(childData => {
            this.fillWithData(childData, data, dataType, elementLimit+1);
            subscriber.next(childData);
            subscriber.complete();
          })
        } else {
          let result = {};
          this.fillWithData(result, data, dataType, elementLimit+1, true);
          subscriber.next(result);
          subscriber.complete();
        }
      });
    });
  }

  private fillWithData(result: any, data: any[], dataType: string, number: number, first: boolean = false): void {
    if (first) {
      result['Czas'] = [];
      data.forEach(elem => {
        let date = new Date(elem.timestamp);
        result['Czas'].push(`${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`);
      })
    }
    if (dataType === 'valve') {
      result[`Y${number}`] = [];
      data.forEach(elem => {
        result[`Y${number}`].push(elem.valve_open ? 'otwarty' : 'zamknięty');
      });
      return;
    }
    if (dataType === 'pump') {
      result[`P${number}`] = [];
      data.forEach(elem => {
        result[`P${number}`].push(elem.pump_state ? 'włączona' : 'wyłączona');
      });
      return;
    }
    if (dataType === 'container') {
      result[`C${number}`] = [];
      data.forEach(elem => {
        result[`C${number}`].push(elem.container_state);
      });
      return;
    }
  }
}
