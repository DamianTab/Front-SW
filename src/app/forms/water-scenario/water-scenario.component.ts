import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

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
  total_time: number;
  filter_time: number;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
  }

  confirmScenario(): void {
    if (this.c1_min > this.c1_max || this.c2_min > this.c2_max || this.c3_min > this.c3_max || this.c4_min > this.c4_max || this.c5_min > this.c5_max) {
      this.toastService.error('Niepoprawe dane w scenariuszu');
      return;
    }
    //jeśli jakiś min/max jest nezdefiniowany, przyjmujemy wykorzystanie zbiornika do minimum/maximum?
      this.toastService.success('Pomyślnie rozpoczęto scenariusz')
    //TODO sending data to backend
  }

}
