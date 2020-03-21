import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sw-container-settings',
  templateUrl: './container-settings.component.html',
  styleUrls: ['./container-settings.component.scss']
})
export class ContainerSettingsComponent implements OnInit {
  @Input() values: {
  t_ust: number;
  rg: number; rd: number;
  cap: number;
  min: number; max: number };
  @Input() readonly title: string;
  @Input() readonly disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

}
