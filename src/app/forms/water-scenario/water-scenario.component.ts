import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
  }

  confirmScenario(): void {
    if (this.c1_min > this.c1_max || this.c2_min > this.c2_max || this.c3_min > this.c3_max || this.c4_min > this.c4_max || this.c5_min > this.c5_max) {
        //wrong input data, aborting execution
        return;
      }
    //do smth, send data to backend
    //jeśli jakiś min/max jest nezdefiniowany, przyjmujemy wykorzystanie zbiornika do minimum/maximum?
  }

}
