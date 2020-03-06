import { Component, Input, SimpleChanges, AfterViewInit, OnChanges } from '@angular/core';
import { ChartService } from '../../../services/charts/chart.service';
import {Observable, Subscriber, Subscription} from 'rxjs';

/* Example:
 * <sw-chart dataType="oxygen" [interval]="interval"></sw-chart>
 *
 * Warning - dataType have to be named like the service accessor in the ChartService!!!
 *
 * Additional attributes:
 * width - width of the graph
 * height - height of the graph
 * lineColor - color of the function
 * title - title of the graph
 * fontSize - font size of the graph title
 * shadow - shadow under the function
 * xLabel - title of the x axis
 * yLabel - title of the y axis
 */
@Component({
  selector: 'sw-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnChanges {

  constructor(private service: ChartService) {
    this.setInitialOptions();
  }
  private previousData: ChartService.Data;
  private data: any;
  private options: any = null;
  private subscription: Subscription;
  @Input() readonly makeAnimation: boolean;
  @Input() readonly lineColor: string = this.randomColor();
  @Input() readonly title: string = '';
  @Input() readonly fontSize: number = 16;
  @Input() readonly shadow: boolean = true;
  @Input() readonly xLabel: string = '';
  @Input() readonly yLabel: string = '';
  @Input() readonly dataType: any;
  @Input() readonly interval: ChartService.MetaData;

  private static convertDateToLabel(date: Date): string {
    // tslint:disable-next-line:max-line-length
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()}`;
  }

  setInitialOptions(): void {
    this.previousData = {y: [], timestamps: []};
    this.data = {
      labels: [],
      datasets: [
        {
          data: [],
          fill: this.shadow,
          borderColor: this.lineColor
        }
      ]
    };
    this.options = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: this.xLabel !== '',
              labelString: this.xLabel
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: this.yLabel !== '',
              labelString: this.yLabel
            }
          }
        ]
      },
      animation: {
        duration: 1500
      },

      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.previousData === undefined) { return; }
    if (changes.interval.currentValue !== changes.interval.previousValue) {
      if ( this.subscription ) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.getServiceData(this.makeAnimation).subscribe(data => {
        this.actualizeChart(data, this.makeAnimation);
        this.previousData = data;
      });
    }
  }

  private actualizeChart(data: ChartService.Data, doAnimation: boolean): void {
    this.data = {
      labels: this.convertToLabels(data.timestamps),
      datasets: [
        {
          data: data.y,
          fill: this.shadow,
          borderColor: this.lineColor
        }
      ]
    };
    this.options.title = {
      display: this.title !== '',
      text: this.title,
      fontSize: this.fontSize
    };
    if (doAnimation) {
      this.options.animation.duration = 1500;
    } else {
      this.options.animation.duration = 0;
    }
  }

  private getServiceData(update: boolean): Observable<ChartService.Data> {
    return this.service[this.dataType](
      this.interval,
      this.previousData,
      !update
    );
  }

  private randomColor(): string {
    const r: number = Math.round(Math.random() * 255);
    const g: number = Math.round(Math.random() * 255);
    const b: number = Math.round(Math.random() * 255);
    return this.rgb2hex(`rgba(${r}, ${g}, ${b}, 1)`);
  }

  private rgb2hex(rgb: string): string {
    const setRgb = rgb.match(
      /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
    );
    return (
      '#' +
      ('0' + parseInt(setRgb[1], 10).toString(16)).slice(-2) +
      ('0' + parseInt(setRgb[2], 10).toString(16)).slice(-2) +
      ('0' + parseInt(setRgb[3], 10).toString(16)).slice(-2)
    );
  }

  private convertToLabels(dates: Date[]) {
    const labels: string[] = [];
    dates.forEach( item => labels.push(ChartComponent.convertDateToLabel(item)));
    return labels;
  }
}
