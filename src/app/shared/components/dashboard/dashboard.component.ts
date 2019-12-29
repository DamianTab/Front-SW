import { Component, Input, ViewContainerRef, ViewChild, ContentChildren, QueryList, Query } from '@angular/core';
import { TrackComponent } from './track/track.component';

@Component({
  selector: 'sw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Input('show') selectedTrack: string
  @ContentChildren(TrackComponent) tracks: QueryList<TrackComponent>
}
