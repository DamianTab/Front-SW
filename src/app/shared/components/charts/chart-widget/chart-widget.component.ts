import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from '../../../services/charts/chart.service';
import {Calendar} from 'primeng';

/* Example:
 * <sw-chart-widget dataType="oxygen"></sw-chart-widget>
 *
 * Additional attributes:
 * title - graph title
 * yLabel - title of the y axis
 */
@Component({
  selector: 'sw-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss']
})
export class ChartWidgetComponent implements OnInit {

  @Input() readonly title: string = '';
  @Input() readonly yLabel: string = '';
  @Input() readonly dataType: any;

  private interval: ChartService.MetaData;
  private xLabel = '';
  startTime: Date;
  endTime: Date;
  console = console;

  ngOnInit() {

    this.interval = {
      begin: new Date(Date.now()),
      end: new Date(Date.now())
    };
    this.intervalBegin.setDate( this.intervalBegin.getDate() - 7 );

    this.startTime = new Date(this.intervalBegin);
    this.endTime = new Date(this.intervalEnd);

    this.checkXLabel();
  }

  saveChartImg() {
    const canvas = document.querySelector(`sw-chart-widget[dataType=${this.dataType}]`).getElementsByTagName('canvas').item(0);
    const img = document.createElement('canvas');

    const ctx = img.getContext('2d');
    img.width = canvas.width;
    img.height = canvas.height;

    ctx.drawImage(canvas, 0, 0);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, img.width, img.height);


    const url = img.toDataURL('image/png');
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${this.title}.png`);
    link.click();
  }

  get intervalBegin(): Date {
    return this.interval.begin;
  }

  set intervalBegin(val: Date) {
    this.interval = {
      begin: val,
      end: this.interval.end
    };

    this.checkXLabel();
  }

  get intervalEnd(): Date {
    return this.interval.end;
  }

  set intervalEnd(val: Date) {
    this.interval = {
      begin: this.interval.begin,
      end: new Date(val)
    };

    this.checkXLabel();
  }

  private parseDate(date: Date): string {
    return date.toISOString().slice(0, 16);
  }

  private checkXLabel(): void {
    if (this.dayEquals(this.interval.begin, this.interval.end)) {
      this.xLabel = 'Godzina';
    } else {
      this.xLabel = 'Dzień';
    }
  }

  private dayEquals(a: Date, b: Date): boolean {
    return a.getFullYear() == b.getFullYear() &&
    a.getMonth() == b.getMonth() &&
    a.getDate() == b.getDate();
  }

  changeStart() {
    if (this.startTime <= this.endTime) {
      this.intervalBegin = this.startTime;
    } else {
      this.startTime = new Date(this.endTime);
      this.intervalBegin = this.startTime;
    }
  }

  changeEnd() {
    if (this.endTime >= this.startTime) {
      if (this.endTime > new Date(Date.now())) {
        this.endTime = new Date(Date.now());
      } else {
          this.intervalEnd = this.endTime;
      }
    } else {
      this.endTime = new Date(this.startTime);
      this.intervalEnd = this.endTime;
    }
  }
}
