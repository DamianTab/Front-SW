import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ScenarioElementComponent } from './scenario-element/scenario-element.component';


@Component({
  selector: 'sw-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {

  @ViewChildren(ScenarioElementComponent) readonly elements: QueryList<ScenarioElementComponent>;
  elems: number[];

  ngOnInit() {
    this.elems = [1, 2];
  }

  addElement(): void {
    this.elems.push(Math.max.apply(null, this.elems)+1);
  }

  deleteElement(elemId: number): void {
    if (this.elems.length > 1) {
      this.elems = this.elems.filter(elem => elem !== elemId);
    }
  }

  submitScenario(): void {
    let scenario = [];
    this.elements.forEach(element => {
      scenario.push({phase: element.selectedPhase, duration: element.selectedDuration})
    });
    console.log(scenario);
    //data ready to be send to backend
  }

}
