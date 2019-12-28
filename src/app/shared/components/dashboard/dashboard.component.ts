import { Component, ViewChildren, QueryList } from '@angular/core';
import { Track } from './track'
import { throwError } from 'rxjs';

@Component({
  selector: 'sw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private selectedTrack: number = 0
  public readonly tracks: Track[]

  constructor(@ViewChildren('sw-track') children: QueryList) {
    for(let i of children) {
      
    }
  }
}
