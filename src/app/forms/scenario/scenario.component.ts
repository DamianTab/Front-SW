import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ScenarioElementComponent } from './scenario-element/scenario-element.component';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

/*

Usage: as a content of sw-track-widget component, for example:

<sw-dashboard>
    <sw-track>
        <sw-track-widget header="Nowy scenariusz">
            <sw-scenario></sw-scenario>
        </sw-track-widget>
    </sw-track>
</sw-dashboard>
*/


@Component({
  selector: 'sw-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {

  @ViewChildren(ScenarioElementComponent) readonly elements: QueryList<ScenarioElementComponent>;
  elems: number[];

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.elems = [1, 2];
  }

  addElement(): void {
    this.elems.push(Math.max.apply(null, this.elems) + 1);
  }

  deleteElement(elemId: number): void {
    if (this.elems.length > 1) {
      this.elems = this.elems.filter(elem => elem !== elemId);
    }
  }

  submitScenario(): void {
    const scenario = [];
    this.elements.forEach(element => {
      scenario.push({ phase: element.selectedPhase, duration: element.selectedDuration })
    });
    this.toastService.success('Pomyślnie stworzono scenariusz');
    //todo send
    //data ready to be send to backend
  }

}
