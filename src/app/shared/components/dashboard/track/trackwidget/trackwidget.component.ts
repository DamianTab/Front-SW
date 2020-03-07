import { Component, ViewChild, TemplateRef, Input } from '@angular/core';

@Component({
  /* tslint:disable-next-line */
  selector: 'sw-track-widget',
  templateUrl: './trackwidget.component.html'
})
export class TrackWidgetComponent {
  @ViewChild(TemplateRef, { static: false }) readonly content: TemplateRef<any>;

  @Input() readonly header: string;
  @Input() readonly subheader: string;
  @Input() readonly style: string;
  @Input() readonly styleClass: string;
}
