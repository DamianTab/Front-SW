import { Component, Input } from '@angular/core';

@Component({
  selector: 'sw-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent {
  @Input() show: string = "charts";
}
