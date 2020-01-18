import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'sw-scenario-element',
  templateUrl: './scenario-element.component.html',
  styleUrls: ['./scenario-element.component.scss']
})
export class ScenarioElementComponent implements OnInit {

  @Input() readonly elemId: number;
  @Output() deleteElem: EventEmitter<number> = new EventEmitter();
  phases: SelectItem[];
  selectedPhase: string;
  selectedDuration: number;

  ngOnInit() {
    this.phases = [
      {label:'Nalewanie', value:'Nalewanie'},
      {label:'Napowietrzanie', value:'Napowietrzanie'},
      {label:'Sedymentacja', value:'Sedymentacja'},
      {label:'Filtrowanie', value:'Filtrowanie'},
      {label:'Oddzielanie', value:'Oddzielanie'}
    ];
  }

  deleteElement(): void {
    this.deleteElem.emit(this.elemId);
  }

}
