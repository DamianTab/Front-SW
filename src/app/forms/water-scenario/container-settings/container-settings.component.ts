import {Component, Input, OnInit} from '@angular/core';
import {ConfigLocalValues} from '../../../shared/models/config-local-values';

@Component({
  selector: 'sw-container-settings',
  templateUrl: './container-settings.component.html',
  styleUrls: ['./container-settings.component.scss']
})
export class ContainerSettingsComponent implements OnInit {
  @Input() readonly title: string;
  @Input() readonly disabled: boolean;
  @Input() values: ConfigLocalValues;

  constructor() { }

  ngOnInit() {
  }

}
