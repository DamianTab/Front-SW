import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SteeringStateService } from '../../../shared/services/steering-state/steering-state.service';
import { SteeringState } from 'src/app/shared/models/steering-state';
import { RequestService } from '../../../shared/services/request/request.service';

@Component({
  selector: 'sw-water-controller',
  templateUrl: './water-controller.component.html',
  styleUrls: ['./water-controller.component.scss']
})
export class WaterControllerComponent implements OnInit {
  private prvView: WaterControllerCss;

  private prvBlocked = false;

  private prvChecked: any = {
    P1: false,
    P2: false,
    P3: false,
    P4: false,
    Y1: false,
    Y2: false,
    Y3: false
  };

  constructor(
    private toastService: ToastService,
    private steeringStateService: SteeringStateService,
    private requestService: RequestService
  ) {}

  public ngOnInit() {
    this.prvView = new WaterControllerCss(
      this.prvChecked,
      () => !this.blocked,
      { width: 7530, height: 5895 },
      this.requestService,
      this.toastService
    );
  }

  set blocked(value) {
    this.prvBlocked = value;
    this.prvView.notify();
  }

  get blocked(): boolean {
    return this.prvBlocked;
  }

  get checked(): any {
    return this.prvChecked;
  }

  public changeAccesStatus(): void {
    if (this.prvBlocked) {
      this.steeringStateService
        .tryToChangesStationSteeringState('water', 1, SteeringState.RM)
        .subscribe(
          () => {
            this.toastService.info('Uzyskano dostęp wyłączny do stanowiska');
          },
          () => {
            this.toastService.warn(
              'Nie udało się zmienić trybu działania. Stanowisko prawdopodobnie jest zajęte.'
            );
            this.blocked = false;
          }
        );
    } else {
      this.toastService.info('Zwolniono dostęp do urządzenia');
    }
  }
}

class WaterControllerCss {
  private clickableAreas: Area[] = [];
  private colors = {
    active: {
      on: '#00FF0D',
      off: '#FF0000'
    },
    inactive: {
      on: '#008006',
      off: '#800000'
    }
  };

  constructor(
    private checked: boolean,
    private isBlocked: Predicate,
    private img: Image,
    private requestService: RequestService,
    private toastService: ToastService
  ) {
    this.bindMethods();

    $(() => {
      $('#img-buttons').on('click', this.buttonClicked);
      this.alignSliders();
      this.resizeSliders();
      setTimeout(this.initButtons, 100);

      $(window).on('resize', this.resizeSliders);
      $(window).on('resize', this.resizeButtons);
    });
  }

  public notify(): void {
    this.drawButtons();
  }

  private bindMethods(): void {
    for (const method of Object.getOwnPropertyNames(
      Object.getPrototypeOf(this)
    )) {
      this[method] = this[method].bind(this);
    }
  }

  private buttonClicked(event: any): void {
    const button = event.target.attributes.getNamedItem('data-button').value;
    if (!this.isBlocked()) {
      this.requestService
        .setOnOff(
          `/water/1/${
            button.charAt(0) === 'P' ? 'pump' : 'valve'
          }/${button.charAt(1)}/states/`,
          this.checked[button] ? { state: false } : { state: true }
        )
        .subscribe(
          data => {
            this.checked[button] = !this.checked[button];
            this.drawButtons();
            this.toastService.info('Zmieniono stan elementu');
          },
          () => {
            this.toastService.warn('Nie udało się zmienić stanu elementu.');
          }
        );
    }
  }

  private alignSliders(): void {
    $('p-inputSwitch > div').each(function() {
      $(this).css({ float: 'left' });
    });
  }

  private resizeSliders(): void {
    $('span.ui-inputswitch-slider').each(function() {
      const absHeight = $(this)
        .parents('div[class^=p-col-]')
        .height();
      const elHeight = $(this).height();

      $(this).css({ transform: `translateY(${(absHeight - elHeight) / 2}px)` });
    });
  }

  private initButtons(): void {
    $('#canvas-buttons').attr('width', this.img.width);
    $('#canvas-buttons').attr('height', this.img.height);

    const water = this;
    $('area')
      .each(function() {
        const pairs = $(this)
          .attr('data-triangle-coords')
          .split(', ');
        const splittedPoints = pairs.map(point => {
          const coords = point.split(',').map(val => Number.parseFloat(val));
          return {
            x: coords[0],
            y: coords[1]
          };
        });
        const a = $(this)
          .attr('coords')
          .split(',')
          .map(val => Number.parseFloat(val));
        water.clickableAreas.push({
          ID: $(this).attr('id'),
          points: splittedPoints,
          circleSubArea: {
            x: a[0],
            y: a[1],
            radius: a[2]
          }
        });
      })
      .promise()
      .done(water.resizeButtons);
  }

  private resizeButtons(): void {
    const $pic = $('#img-water');

    const current = {
      width: $pic.width(),
      height: $pic.height()
    };

    $('#canvas-buttons').attr('width', current.width);
    $('#canvas-buttons').attr('height', current.height);

    const ratio = {
      width: current.width / this.img.width,
      height: current.height / this.img.height
    };

    for (const area of this.clickableAreas) {
      const coords: string[] = [];

      {
        const copy = Object.assign({}, area.circleSubArea);
        copy.x *= ratio.width;
        copy.y *= ratio.height;
        copy.radius *= ratio.width;

        $(`#${area.ID}`).attr(
          'coords',
          [copy.x, copy.y, copy.radius].join(',')
        );
      }

      for (const p of area.points) {
        let [x, y] = [p.x, p.y];

        x *= ratio.width;
        y *= ratio.height;

        coords.push(`${x},${y}`);
      }

      $(`#${area.ID}`).attr('data-triangle-coords', coords.join(', '));
    }

    this.drawButtons();
  }

  private drawButtons(): void {
    const $canvas = document.getElementById(
      'canvas-buttons'
    ) as HTMLCanvasElement;
    const ctx = $canvas.getContext('2d');

    const water = this;
    $('area').each(function() {
      const pairs = $(this)
        .attr('data-triangle-coords')
        .split(', ');
      const [startX, startY] = pairs[0]
        .split(',')
        .map(val => Number.parseFloat(val));

      const state = water.isBlocked() ? 'inactive' : 'active';
      ctx.fillStyle = water.checked[$(this).attr('data-button')]
        ? water.colors[state].on
        : water.colors[state].off;

      ctx.beginPath();
      ctx.moveTo(startX, startY);

      for (let i = 1; i < pairs.length; i++) {
        const [x, y] = pairs[i].split(',').map(val => Number.parseFloat(val));
        ctx.lineTo(x, y);
      }

      ctx.closePath();
      ctx.fill();
    });
  }
}

interface Image {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

interface Area {
  ID: string;
  points: Point[];
  circleSubArea: {
    x: number;
    y: number;
    radius: number;
  };
}

type Predicate = (...args: any[]) => boolean;
