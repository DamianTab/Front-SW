import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'sw-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {

  elems: number[];

  constructor() {
      this.elems = [1, 2];
  }

  ngOnInit() {
  }

}
