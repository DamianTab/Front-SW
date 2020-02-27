import { Component, OnInit, Input } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { TempScenario } from '../../shared/models/temp-scenario';

@Component({
  selector: 'sw-water-scenario',
  templateUrl: './water-scenario.component.html',
  styleUrls: ['./water-scenario.component.scss']
})
export class WaterScenarioComponent implements OnInit {

  c1_min: number;
  c1_max: number;
  c2_min: number;
  c2_max: number;
  c3_min: number;
  c3_max: number;
  c4_min: number;
  c4_max: number;
  c5_min: number;
  c5_max: number;

  private waterID: number;

  constructor(private toastService: ToastService,
    private http: HttpClient) { }

  ngOnInit() {
    this.waterID = Number.parseInt(location.pathname.split('/').filter((val: any) => Number(val))[0]);
  }

  confirmScenario(): void {
    for (let i = 1; i <= 5; i++) {
      const [min, max] = [`c${i}_min`, `c${i}_max`]
      if (this[min] > this[max] || this[min] === undefined || this[max] === undefined) {
        this.toastService.error('Niepoprawe dane w scenariuszu');
        return;
      }
    }

    const scenario: TempScenario = {
      'C_min': [this.c1_min, this.c2_min, this.c3_min, this.c4_min, this.c5_min],
      'C_max': [this.c1_max, this.c2_max, this.c3_max, this.c4_max, this.c5_max]
    }

    this.http.post(`/water/${this.waterID}/automatic/`, scenario).subscribe((response: any) => {
      this.toastService.success('Pomyślnie rozpoczęto scenariusz');
    }, (error) => {
      this.toastService.error('Nie udało się rozpocząć scenariusz');
    })
    //jeśli jakiś min/max jest nezdefiniowany, przyjmujemy wykorzystanie zbiornika do minimum/maximum? ~ Nie, wszystkie inputy musza byc zdefiniowane [Adam]
  }

}
