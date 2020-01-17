import { Component, Input, ContentChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { TrackComponent } from './track/track.component';

/* 
 * <sw-dashboard show="one">
 *  <sw-track name="one">
 *   <sw-track-widget header="header" subheader="subheader">
 *    
 *      ... 
 * 
 *   </sw-track-widget>
 *  </sw-track>
 * </sw-dashboard> 
 *
 * sw-dashboard - dashboard of subtracks, shows only one at the same time
 * sw-track - set of widgets
 * sw-track-widget - widget on dashboard
 * 
 * Attributes:
 * a) sw-dashboard
 * show - id of sw-track to be shown
 * 
 * b) sw-track
 * name - id of sw-track
 * 
 * c) sw-track-widget
 * header - p-card header
 * subheader - p-card subheader
 * style - p-card style
 * styleClass - p-card styleClass
 */
@Component({
  selector: 'sw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @Input('show') readonly selectedTrack: string;
  @ContentChildren(TrackComponent) readonly tracks: QueryList<TrackComponent>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}