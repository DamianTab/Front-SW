import { Component, Input, ContentChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { TrackComponent } from './track/track.component';

/*
 * <sw-dashboard>
 *  <sw-track>
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
  @ContentChildren(TrackComponent) readonly tracks: QueryList<TrackComponent>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.replaceInnerCssClass('ui-card', 'sw-ui-card')
  }

  replaceInnerCssClass(searchValue: string, replaceValue): void {
    const collection = document.getElementsByClassName(searchValue)
    for(const i in collection) {
      const element = collection.item(Number.parseInt(i))
      element.className = element.className.replace(searchValue, replaceValue)
    }
  }
}
