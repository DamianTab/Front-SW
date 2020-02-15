import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'sw-water-controller',
  templateUrl: './water-controller.component.html',
  styleUrls: ['./water-controller.component.scss']
})
export class WaterControllerComponent implements OnInit {

  private _view: WaterControllerCss;

  private _blocked: boolean = false;

  private _checked: any = {
    'P1': false,
    'P2': false,
    'P3': false,
    'P4': false,
    'Y1': false,
    'Y2': false,
    'Y3': false
  };

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this._view = new WaterControllerCss(this._checked, () => !this.blocked, { 'width': 7530, 'height': 5895 });
  }

  set blocked(value) {
    this._blocked = value;
    this._view.notify();
  }

  get blocked(): boolean {
    return this._blocked;
  }

  get checked(): any {
    return this._checked;
  }

  changeAccesStatus(value): void {
    if (value.checked) {
      this.toastService.warn('Uzyskano dostęp wyłączny do urządzenia');
    } else {
      this.toastService.info('Zwolniono dostęp do urządzenia');
    }
  }
}

class WaterControllerCss {
  private points: WaterControllerCss.Areas = [];
  private colors = {
    'active': {
      'on': '#00FF0D',
      'off': '#FF0000'
    },
    'inactive': {
      'on': '#008006',
      'off': '#800000'
    }
  }

  constructor(private checked: any, private isBlocked: WaterControllerCss.Predicate, private img: WaterControllerCss.Image) {
    this.bindMethods();
    
    $(document).ready(() => {
      $('#img-buttons').on('click', this.buttonClicked);
      this.alignSliders();
      this.resizeSliders();
      setTimeout(this.initButtons, 100);
      $(window).resize(this.resizeSliders);
      $(window).resize(this.resizeButtons);
    });
  }

  notify(): void {
    this.drawButtons();
  }

  private bindMethods(): void {
    for(let method of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      this[method] = this[method].bind(this);
    }
  }

  private buttonClicked(event: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>): void {
    const button = event.target.attributes.getNamedItem('data-button').value;
    if(!this.isBlocked()) {
      this.checked[button] = !this.checked[button];
    }
    this.drawButtons();
  }

  private alignSliders(): void {
    $('p-inputSwitch > div').each(function () {
      $(this).css({ 'float': 'left' });
    });
  }

  private resizeSliders(): void {
    $('span.ui-inputswitch-slider').each(function () {
      const absHeight = $(this).parents('div[class^=p-col-]').height();
      const elHeight = $(this).height();

      $(this).css({ 'transform': `translateY(${(absHeight - elHeight) / 2}px)` });
    });
  }

  private initButtons(): void {
    $('#canvas-buttons').attr('width', this.img.width);
    $('#canvas-buttons').attr('height', this.img.height);

    const water = this;
    $('area').each(function() {
      const pairs = $(this).attr('coords').split(', ');
      const points = pairs.map((point) => {
        const [x, y] = point.split(',');
        return {
          'x': Number.parseFloat(x),
          'y': Number.parseFloat(y)
        }
      });
      water.points.push([$(this).attr('id'), points]);
    }).promise().done(water.resizeButtons);
  }

  private resizeButtons(): void {
    const $pic = $('#img-water');

    const current = {
      'width': $pic.width(),
      'height': $pic.height()
    }
    
    $('#canvas-buttons').attr('width', current.width);
    $('#canvas-buttons').attr('height', current.height);

    const ratio = {
      'width': current.width / this.img.width,
      'height': current.height / this.img.height
    };

    for (const [areaID, points] of this.points) {
      const coords: string[] = [];

      for (const p of points) {
        let [x, y] = [p.x, p.y];

        x *= ratio.width;
        y *= ratio.height;

        coords.push(`${x},${y}`);
      }

      $(`#${areaID}`).attr("coords", coords.join(", "));
    }

    this.drawButtons();
  }

  private drawButtons(): void {
    const $canvas = document.getElementById('canvas-buttons') as HTMLCanvasElement;
    const ctx = $canvas.getContext('2d');

    const water = this;
    $("area").each(function () {
      const pairs = $(this).attr('coords').split(', ');
      const [startX, startY] = pairs[0].split(',').map((val) => Number.parseFloat(val));

      let state = water.isBlocked() ? 'inactive' : 'active';
      ctx.fillStyle = water.checked[$(this).attr('data-button')] ? water.colors[state].on : water.colors[state].off;

      ctx.beginPath();
      ctx.moveTo(startX, startY);

      for (let i = 1; i < pairs.length; i++) {
        const [x, y] = pairs[i].split(',').map((val) => Number.parseFloat(val));
        ctx.lineTo(x, y);
      }

      ctx.closePath();
      ctx.fill();
    })
  }
}

namespace WaterControllerCss {
  export interface Image {
    'width': number,
    'height': number
  }

  type Point = {'x': number, 'y': number};
  type ID = string;
  export type Areas = [ID, Point[]][];

  export type Predicate = (...args: any[]) => boolean;
}