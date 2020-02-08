import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sw-water-controller',
  templateUrl: './water-controller.component.html',
  styleUrls: ['./water-controller.component.scss']
})
export class WaterControllerComponent implements OnInit {

  private blocked: boolean = false

  private checked: any = {
    'P1': false,
    'P2': false,
    'P3': false,
    'P4': false,
    'Y1': false,
    'Y2': false,
    'Y3': false
  }

  constructor() { }

  ngOnInit() {
    this.setDynamicCss()
  }

  setDynamicCss(): void {
    $(document).ready(function() {
      $('p-inputSwitch > div').each(function() {
        $(this).css({'float': 'right'})
      })
    })
  }

}
