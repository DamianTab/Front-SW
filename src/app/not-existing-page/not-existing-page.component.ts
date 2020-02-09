import { Component, OnInit } from '@angular/core';
import {RouterElement} from '../shared/components/navbar/models/router-element';

@Component({
  selector: 'app-not-existing-page',
  templateUrl: './not-existing-page.component.html',
  styleUrls: ['./not-existing-page.component.scss']
})
export class NotExistingPageComponent implements OnInit {

  link = new RouterElement('404', '404');

  constructor() { }

  ngOnInit() {
  }

}
