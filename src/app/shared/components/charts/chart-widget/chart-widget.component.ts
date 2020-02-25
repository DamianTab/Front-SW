import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from '../../../services/charts/chart.service';
import {InputSwitch} from 'primeng';

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
  // date input limiters
  private _minDate: Date;
  private _maxDate: Date = new Date();

  @Input() readonly title: string = '';
  @Input() readonly yLabel: string = '';
  @Input() readonly dataType: any;

  private interval: ChartService.MetaData;
  private xLabel = '';
  startTime: Date;
  endTime: Date;
  console = console;
  pl: any = {
    firstDay : 1
  };
  periodTypeSwitch: boolean;

  ngOnInit() {
    this._maxDate.setMinutes(0, 0, 0);
    this._minDate = new Date(this._maxDate);

    if (this._maxDate.getMonth() - 1 < 0) {
      this._minDate.setFullYear(this._minDate.getFullYear() - 1, 11);
    } else {
      this._minDate.setMonth(this._maxDate.getMonth() - 1);
    }

    this.interval = {
      begin: this._minDate,
      end: this._maxDate
    };

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

  get minDate(): Date {
    return this._minDate;
  }

  get maxDate(): Date {
    return this._maxDate;
  }

  get intervalBegin(): Date {
    return this.interval.begin;
  }

  parse(date: Date) {
    return {
      begin: {
        second: date.getSeconds(),
        minute: date.getMinutes(),
        hour: date.getHours(),
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear()
      }
    };
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
}
