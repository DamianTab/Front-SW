import { Component, Input } from '@angular/core';
import { ChartService } from '../../../services/charts/chart.service';

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
export class ChartWidgetComponent {
  //date input limiters
  private readonly _minDate: Date;
  private readonly _maxDate: Date;

  @Input() readonly title: string = "";
  @Input() readonly yLabel: string = "";
  @Input() readonly dataType: any; 

  private interval: ChartService.MetaData;
  private xLabel: string = "";

  constructor() {
    this._maxDate = new Date()
    this._maxDate.setMinutes(0, 0, 0)

    this._minDate = new Date(this._maxDate)

    if(this._maxDate.getMonth() - 1 < 0) {
      this._minDate.setFullYear(this._minDate.getFullYear() - 1, 11)
    }

    this.interval = {
      begin: this._minDate, 
      end: this._maxDate
    }

    this.checkXLabel()
  }


  get minDate(): string {
    return this.parseDate(this._minDate)
  }

  get maxDate(): string {
    return this.parseDate(this._maxDate)
  }

  get intervalBegin(): string {
    return this.parseDate(this.interval.begin)
  }

  set intervalBegin(val: string) {
    this.interval = {
      begin: new Date(val),
      end: this.interval.end
    }

    this.checkXLabel()
  }

  get intervalEnd() {
    return this.parseDate(this.interval.end)
  }

  set intervalEnd(val: string) {
    this.interval = {
      begin: this.interval.begin,
      end: new Date(val)
    }

    this.checkXLabel()
  }

  private parseDate(date: Date): string {
    return date.toISOString().slice(0, 16)
  }

  private checkXLabel(): void {
    if(this.dayEquals(this.interval.begin, this.interval.end)) {
      this.xLabel = "Godzina"
    } else {
      this.xLabel = "Dzień"
    }
  }

  private dayEquals(a: Date, b: Date): boolean {
    return a.getFullYear() == b.getFullYear() &&
    a.getMonth() == b.getMonth() &&
    a.getDate() == b.getDate();
  }
}
