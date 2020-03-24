import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { TempScenario } from '../../shared/models/temp-scenario';
import {ConfigLocalValues} from '../../shared/models/config-local-values';
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
  values: ConfigLocalValues[];
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
    this.values = []; // setting values for specific container
    this.items = []; // menu elements
    this.visible = 1; // which container config is visible
    this.numbers = [1, 2, 3, 4, 5];
    const component = this;
    for (const i of this.numbers) {
      this.values[`C${i}`] = new ConfigLocalValues();
      this.items.push({label: `Zbiornik ${i}`, command: (() => component.visible = i)});
    }
  }

  ngOnInit(): void {
    // this.waterID = Number.parseInt(location.pathname.split('/').filter((val: any) => Number(val))[0]);
    this.waterID = 1;
  }

  public confirmScenario(): void {
    for (const i of this.numbers) {
      if (this.checkConstraints(i)) {
        this.toastService.error('Niepoprawne ustawienia');
        return;
      }
    }

    this.http.put(`/water/${this.waterID}/config/`, this.valuesToConfig()).subscribe(
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
        this.values = this.configToValues(data);
        this.isLoading = false;
      },
      () => {
        this.toastService.error('Nie udało się załadować bieżących ustawień');
        this.isLoading = false;
      }
    );
  }

  private configToValues(config: TempScenario[]): ConfigLocalValues[] {
    const result: ConfigLocalValues[] = [];
    const properties: string[] = Object.keys(config);
    properties.forEach( (key) => {
      if (this.values.hasOwnProperty(key)) {
        result[key] = {
          waterLevelDuration: config[key].t_ust,
          upperWorkingLevel: config[key].rg,
          lowerWorkingLevel: config[key].rd,
          capacity: config[key].cap,
          minLevel: config[key].min,
          maxLevel: config[key].max
        };
      }
    });
    return result;
  }

  private valuesToConfig(): TempScenario[] {
    const result: TempScenario[] = [];
    const properties: string[] = Object.keys(this.values);
    properties.forEach( (key) => {
      if (this.values.hasOwnProperty(key)) {
        result[key] = {
          t_ust: this.values[key].waterLevelDuration,
          rg: this.values[key].upperWorkingLevel,
          rd: this.values[key].lowerWorkingLevel,
          cap: this.values[key].capacity,
          min: this.values[key].minLevel,
          max: this.values[key].maxLevel
        };
      }
    });
    return result;
  }

  private checkConstraints(i: number): boolean {
    return (
      this.values[`C${i}`].minLevel > this.values[`C${i}`].lowerWorkingLevel ||
      this.values[`C${i}`].lowerWorkingLevel > this.values[`C${i}`].upperWorkingLevel ||
      this.values[`C${i}`].upperWorkingLevel > this.values[`C${i}`].maxLevel ||
      this.values[`C${i}`].maxLevel > this.values[`C${i}`].capacity ||
      this.values[`C${i}`].minLevel === undefined ||
      this.values[`C${i}`].lowerWorkingLevel === undefined ||
      this.values[`C${i}`].upperWorkingLevel === undefined ||
      this.values[`C${i}`].maxLevel === undefined ||
      this.values[`C${i}`].capacity === undefined
    );
  }
}
