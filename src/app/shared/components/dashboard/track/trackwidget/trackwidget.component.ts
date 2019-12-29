import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'sw-track-widget',
  templateUrl: './trackwidget.component.html'
})
export class TrackwidgetComponent {
  @ViewChild(TemplateRef, {static: false}) content: TemplateRef<any>
}
