import { Component, OnInit, ContentChildren, QueryList, Input } from '@angular/core';
import { TrackwidgetComponent }from './trackwidget/trackwidget.component'
import { WidgetItem } from './widgetitem'

@Component({
  selector: 'sw-track',
  templateUrl: './track.component.html'
})
export class TrackComponent {
  @ContentChildren(TrackwidgetComponent) widgets: QueryList<TrackwidgetComponent>
  contents: WidgetItem[] = []

  @Input() name: string

  ngAfterViewInit() {
    this.widgets.forEach((widget: TrackwidgetComponent) => {
      var item = new WidgetItem()
      item.content = widget.content
      this.contents.push(item)
    })
  }
}
