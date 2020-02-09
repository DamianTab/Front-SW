import {Component, NgModule, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import {LoginModule} from './login/login.module';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // console.log(this.location.path());
  }
  title = 'front-app';

  constructor(r: ActivatedRoute) {
    r.url.subscribe((s: UrlSegment[]) => {
      console.log("url", s);
    });
  }
}
