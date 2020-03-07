import { Component, ContentChildren, QueryList, Input } from '@angular/core';
import { TrackWidgetComponent } from './trackwidget/trackwidget.component';

@Component({
  /* tslint:disable-next-line */
  selector: 'sw-track',
  templateUrl: './track.component.html'
})
export class TrackComponent {
  @ContentChildren(TrackWidgetComponent) readonly widgets: QueryList<TrackWidgetComponent>;
  @Input() readonly name: string;
}
