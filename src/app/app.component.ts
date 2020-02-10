import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(r: ActivatedRoute) {
    r.url.subscribe((s: UrlSegment[]) => {
      console.log("url", s);
    });
  }
}
