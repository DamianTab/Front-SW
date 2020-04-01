import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SteeringState } from '../../models/steering-state';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SteeringStateService {
  constructor(private httpClient: HttpClient) {}

  public tryToChangesStationSteeringState(
    stationName: string,
    stationId: number,
    steeringState: SteeringState
  ) {
    const body = new SteeringStateDTO(steeringState);
    return this.httpClient
      .post(`/${stationName}/${stationId}/states/`, body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 304) {
            return 'Ok';
          } else {
            return throwError(error);
          }
        })
      );
  }
}

class SteeringStateDTO {
  /* tslint:disable-next-line */
  constructor(public steering_state: SteeringState) {}
}
