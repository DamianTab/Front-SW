import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SteeringState } from '../../models/steering-state';

@Injectable({
  providedIn: 'root'
})
export class SteeringStateService {

  constructor(private httpClient: HttpClient) { }


  tryToChangesStationSteeringState(stationName: string, stationId: number, steeringState: SteeringState) {
    const body = new SteeringStateDao(steeringState);
    console.log(JSON.stringify(body));
    return this.httpClient.post(`/${stationName}/${stationId}/states/`, body);
  }

}


class SteeringStateDao {
  constructor(public steering_state: SteeringState) { }
}
