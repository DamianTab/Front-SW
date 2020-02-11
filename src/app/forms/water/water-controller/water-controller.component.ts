import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'sw-water-controller',
  templateUrl: './water-controller.component.html',
  styleUrls: ['./water-controller.component.scss']
})
export class WaterControllerComponent implements OnInit {

  blocked: boolean = false;

  checked: any = {
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
    setDynamicCss();
  }

  changeAccesStatus(value) {
    if (value.checked) {
      this.toastService.warn('Uzyskano dostęp wyłączny do urządzenia');
    } else {
      this.toastService.info('Zwolniono dostęp do urządzenia');
    }
  }
}

function setDynamicCss(): void {
  $(document).ready(function () {
    alignSliders()
    resizeSliders()
    $(window).resize(resizeSliders)
  });
}

function alignSliders(): void {
  $('p-inputSwitch > div').each(function () {
    $(this).css({ 'float': 'right' })
  });
}

function resizeSliders(): void {
  $('span.ui-inputswitch-slider').each(function () {
    const absHeight = $(this).parents('div[class^=p-col-]').height();
    const elHeight = $(this).height();

    $(this).css({ 'transform': `translateY(${(absHeight - elHeight) / 2}px)` })
  });
}
