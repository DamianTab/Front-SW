import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { TempScenario } from '../../shared/models/temp-scenario';
import { SteeringStateService } from '../../shared/services/steering-state/steering-state.service';
import { SteeringState } from 'src/app/shared/models/steering-state';
import {MenuItem} from 'primeng/api';

@Component({
  /* tslint:disable-next-line */
  selector: 'sw-water-scenario',
  templateUrl: './water-scenario.component.html',
  styleUrls: ['./water-scenario.component.scss']
})
export class WaterScenarioComponent implements OnInit {
  private waterID: number;
  blocked: boolean;
  settings: TempScenario[];
  numbers: number[];
  isLoading: boolean;
  items: MenuItem[];
  visible: number;

  constructor(
    private toastService: ToastService,
    private http: HttpClient,
    private steeringStateService: SteeringStateService
  ) {
    this.isLoading = false;
    this.settings = []; // setting values for specific container
    this.items = []; // menu elements
    this.visible = 1; // which container config is visible
    this.numbers = [1, 2, 3, 4, 5];
    const component = this;
    for (const i of this.numbers) {
      this.settings[`C${i}`] = new TempScenario();
      this.items.push({label: `Zbiornik ${i}`, command: (() => component.visible = i)});
    }
  }

  ngOnInit(): void {
    // this.waterID = Number.parseInt(location.pathname.split('/').filter((val: any) => Number(val))[0]);
    this.waterID = 1;
  }

  public confirmScenario(): void {
    for (const i of this.numbers) {
      if (
        this.settings[`C${i}`].min > this.settings[`C${i}`].rd ||
        this.settings[`C${i}`].rd > this.settings[`C${i}`].rg ||
        this.settings[`C${i}`].rg > this.settings[`C${i}`].max ||
        this.settings[`C${i}`].max > this.settings[`C${i}`].cap ||
        this.settings[`C${i}`].min === undefined ||
        this.settings[`C${i}`].rd === undefined ||
        this.settings[`C${i}`].rg === undefined ||
        this.settings[`C${i}`].max === undefined ||
        this.settings[`C${i}`].cap === undefined
      ) {
        this.toastService.error('Niepoprawne ustawienia');
        return;
      }
    }

    this.http.put(`/water/${this.waterID}/config/`, this.settings).subscribe(
      () => {
        this.toastService.success('Pomyślnie zmieniono ustawienia');
      },
      () => {
        this.toastService.error('Nie udało się zmienić ustawień');
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
            this.loadCurrentConfigs();
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

  public loadCurrentConfigs() {
    this.isLoading = true;
    this.http.get(`/water/${this.waterID}/config/`).subscribe(
      (data: TempScenario[]) => {
        this.settings = data;
        this.isLoading = false;
      },
      () => {
        this.toastService.error('Nie udało się załadować bieżących ustawień');
        this.isLoading = false;
      }
    );
  }
}
