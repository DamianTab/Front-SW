import { Component, Input, SimpleChanges, AfterViewInit, OnChanges } from '@angular/core';
import { ChartService } from '../../../services/charts/chart.service';
import { Observable } from 'rxjs';

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
export class ChartComponent implements AfterViewInit, OnChanges {

  @Input() readonly lineColor: string = this.randomColor();
  @Input() readonly title: string = 'Oxygen';
  @Input() readonly fontSize: number = 16;
  @Input() readonly shadow: boolean = true;
  @Input() readonly xLabel: string = '';
  @Input() readonly yLabel: string = '';
  @Input() readonly dataType: any;
  @Input() readonly withAnimation: boolean;
  @Input() readonly interval: ChartService.MetaData;
  private receivedData: ChartService.Data;
  public data: any;
  public options: any;

  constructor(private service: ChartService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.interval.currentValue !== changes.interval.previousValue) {
      const doAnimation = this.withAnimation;
      this.getServiceData(doAnimation).subscribe(data => {
        this.actualizeChart(data, doAnimation);
        this.receivedData = data;
      });
    }
  }

  public actualizeChart(data: ChartService.Data, doAnimation: boolean): void {
    this.data = {
      labels: data.x,
      datasets: [
        {
          data: data.y,
          fill: this.shadow,
          borderColor: this.lineColor
        }
      ]
    };
    if (doAnimation) {
      this.options.animation.duration = 1;
    } else {
      this.options.animation.duration = 0;
    }
  }

  public ngAfterViewInit(
    data: ChartService.Data = { x: [], y: [], timestamps: [] }
  ): void {
    this.data = {
      labels: data.x,
      datasets: [
        {
          data: data.y,
          fill: this.shadow,
          borderColor: this.lineColor
        }
      ]
    };
    this.options = {
      animation: {
        duration: 1
      },
      title: {
        display: this.title !== '',
        text: this.title,
        fontSize: this.fontSize
      },
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

      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1
    };
  }

  private getServiceData(update: boolean): Observable<ChartService.Data> {
    return this.service[this.dataType](
      this.interval,
      this.receivedData,
      update
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
}
