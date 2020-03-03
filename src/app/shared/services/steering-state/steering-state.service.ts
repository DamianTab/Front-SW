import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SteeringState } from '../../models/steering-state';

@Injectable({
  providedIn: 'root'
})
export class SteeringStateService {

  constructor(private httpClient: HttpClient) { }


  tryToChangesStationSteeringState(stationName: string, stationId: number, steeringState: SteeringState) {
    const body = new SteeringStateDTO(steeringState);
    return this.httpClient.post(`/${stationName}/${stationId}/states/`, body);
  }

}

class SteeringStateDTO {
  constructor(public steering_state: SteeringState) { }
}
