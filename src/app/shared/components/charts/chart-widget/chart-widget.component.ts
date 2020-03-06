import { Component, Input, OnInit } from '@angular/core';
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
export class ChartWidgetComponent implements OnInit {
  private timerOn: boolean;
  private previousPeriod: number;
  @Input() readonly title: string = '';
  @Input() readonly yLabel: string = '';
  @Input() readonly dataType: any;
  interval: ChartService.MetaData;
  xLabel = '';
  startTime: Date;
  endTime: Date;
  isLive: boolean;
  secDuration: string;
  minDuration: string;
  makeAnimation: boolean;

  ngOnInit() {
    this.interval = {
      begin: new Date(Date.now()),
      end: new Date(Date.now())
    };
    this.intervalBegin.setDate(this.intervalBegin.getDate() - 7);
    this.startTime = new Date(this.intervalBegin);
    this.endTime = new Date(this.intervalEnd);
    this.minDuration = '1';
    this.secDuration = '0';
    this.previousPeriod = 60;
    this.timerOn = false;
    this.isLive = false;
    this.makeAnimation = true;
    this.checkXLabel();
  }

  public saveChartImg() {
    const canvas = document
      .querySelector(`sw-chart-widget[dataType=${this.dataType}]`)
      .getElementsByTagName('canvas')
      .item(0);
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

  changeMode() {
    this.makeAnimation = true;
    if (this.isLive) {
      if (this.timerOn) {
        return;
      }
      this.setLiveInterval();
    } else {
      this.changeStart();
      this.changeEnd();
    }
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

  zeroWhenEmpty(duration: string) {
    if (duration.length === 0) {
      if (duration === this.minDuration) {
        this.minDuration = '0';
      } else {
        this.secDuration = '0';
      }
    }
  }

  private checkXLabel(): void {
    if (this.dayEquals(this.interval.begin, this.interval.end)) {
      this.xLabel = 'Godzina';
    } else {
      this.xLabel = 'Dzień';
    }
  }

  private dayEquals(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  private setLiveInterval() {
    const miliDuration: number =
      Number(this.minDuration) * 60000 + Number(this.secDuration) * 1000;
    this.interval = {
      end: new Date(Date.now()),
      begin: new Date(Date.now() - miliDuration)
    };
    if (this.previousPeriod !== miliDuration / 1000){
      this.makeAnimation = true;
    }
    this.previousPeriod = miliDuration / 1000;
    setTimeout(() => this.checkIfModeChanged(), 1500);
    this.timerOn = true;
  }

  private checkIfModeChanged() {
    if (this.isLive) {
      this.makeAnimation = false;
      this.setLiveInterval();
    } else {
      this.timerOn = false;
    }
  }
}
