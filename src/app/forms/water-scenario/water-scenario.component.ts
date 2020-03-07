import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { TempScenario } from '../../shared/models/temp-scenario';
import { SteeringStateService } from '../../shared/services/steering-state/steering-state.service';
import { SteeringState } from 'src/app/shared/models/steering-state';

@Component({
  /* tslint:disable-next-line */
  selector: 'sw-water-scenario',
  templateUrl: './water-scenario.component.html',
  styleUrls: ['./water-scenario.component.scss']
})
export class WaterScenarioComponent implements OnInit {
  private waterID: number;
  blocked: boolean;
  waterLevels: { min: number; max: number }[];
  totalTime: number;
  filterTime: number;

  constructor(
    private toastService: ToastService,
    private http: HttpClient,
    private steeringStateService: SteeringStateService
  ) {
    this.waterLevels = new Array(5).fill({ min: undefined, max: undefined });
  }

  ngOnInit(): void {
    // this.waterID = Number.parseInt(location.pathname.split('/').filter((val: any) => Number(val))[0]);
    this.waterID = 1;
  }

  public confirmScenario(): void {
    for (const c of this.waterLevels) {
      if (
        this[c.min] > this[c.max] ||
        this[c.min] === undefined ||
        this[c.max] === undefined
      ) {
        this.toastService.error('Niepoprawe dane w scenariuszu');
        return;
      }
    }

    const scenario: TempScenario = {
      c_min: this.waterLevels.map(value => value.min),
      c_max: this.waterLevels.map(value => value.max),
      total_time: this.totalTime,
      filter_time: this.filterTime
    };

    this.http.post(`/water/${this.waterID}/automatic/`, scenario).subscribe(
      (response: any) => {
        this.toastService.success('Pomyślnie rozpoczęto scenariusz');
      },
      error => {
        this.toastService.error('Nie udało się rozpocząć scenariusz');
      }
    );
  }

  public changeAccessStatus(): void {
    if (this.blocked) {
      this.steeringStateService
        .tryToChangesStationSteeringState(
          'water',
          this.waterID,
          SteeringState.AU
        )
        .subscribe(
          () => {
            this.toastService.info('Uzyskano dostęp wyłączny do stanowiska');
          },
          () => {
            this.toastService.warn(
              'Nie udało się zmienić trybu działania. Stanowisko prawdopodobnie jest zajęte.'
            );
            this.blocked = false;
          }
        );
    } else {
      this.toastService.info('Zwolniono dostęp do urządzenia');
    }
  }
}
