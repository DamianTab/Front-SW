import { Component, OnInit, ContentChildren, QueryList, Input } from '@angular/core';
import { TrackWidgetComponent }from './trackwidget/trackwidget.component'
import { Observable } from 'rxjs';

@Component({
  selector: 'sw-track',
  templateUrl: './track.component.html'
})
export class TrackComponent {
  @ContentChildren(TrackWidgetComponent) readonly widgets: QueryList<TrackWidgetComponent>;
  @Input() readonly name: string;
}
