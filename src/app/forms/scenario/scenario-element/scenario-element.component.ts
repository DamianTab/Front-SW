import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'sw-scenario-element',
  templateUrl: './scenario-element.component.html',
  styleUrls: ['./scenario-element.component.scss']
})
export class ScenarioElementComponent implements OnInit {

  @Input() readonly elemId: number;
  phases: SelectItem[];
  selectedValues = {id:null, phase:null, duration:null};

  constructor() { 

    this.phases = [
      {label:'Nalewanie', value:'Nalewanie'},
      {label:'Napowietrzanie', value:'Napowietrzanie'},
      {label:'Sedymentacja', value:'Sedymentacja'},
      {label:'Filtrowanie', value:'Filtrowanie'},
      {label:'Oddzielanie', value:'Oddzielanie'}
    ];

  }

  ngOnInit() {
    this.selectedValues.id = this.elemId;
  }

}
