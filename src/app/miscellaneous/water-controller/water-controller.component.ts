import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sw-water-controller',
  templateUrl: './water-controller.component.html'
})
export class WaterControllerComponent implements OnInit {

  private checked: any = {
    'P1': false,
    'P2': false,
    'P3': false,
    'P4': false
  }

  constructor() { }

  ngOnInit() {
  }

}
