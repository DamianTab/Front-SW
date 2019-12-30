import { Component } from '@angular/core';
import { ChartService } from '../../../services/charts/chart.service'

@Component({
  selector: 'sw-oxygen-chart',
  templateUrl: './oxygen-chart.component.html',
  styleUrls: ['./oxygen-chart.component.scss']
})
export class OxygenChartComponent {
  interval: ChartService.MetaData;
  static readonly currentDate: Date = new Date()

  constructor() { 
    var startDay = OxygenChartComponent.currentDate
    startDay.setHours(0, 0, 0, 0)
    alert(startDay.toLocaleTimeString)
    this.interval = {begin: startDay, end: OxygenChartComponent.currentDate};
  }

}
