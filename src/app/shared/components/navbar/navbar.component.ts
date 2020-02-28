import { Component, OnInit, Inject } from '@angular/core';
import { RouterElement } from './models/router-element';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DOCUMENT } from '@angular/common';
import { DbPageIterator } from '../../services/db-page/db-page-iterator.service';
import { WaterContainer } from '../../models/water-container';
import { DbPageFetchService } from '../../services/db-page/db-page-fetch.service';

@Component({
  selector: "sw-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {

  private pageIterator: DbPageIterator<WaterContainer>;

  pages = [
    {
      name: "Woda", subpages: []
    },

    {
      name: "Anamox", subpages: [
        new RouterElement('Reaktor', 'anamox', 1),
        new RouterElement('Reaktor', 'anamox', 2),
        new RouterElement('Reaktor', 'anamox', 3),
      ]
    },
    {
      name: "Ags", subpages: [
        new RouterElement('Reaktor', 'ags', 1),
        new RouterElement('Reaktor', 'ags', 2),
        new RouterElement('Reaktor', 'ags', 3)
      ]
    },

    {
      name: "Scenariusz", subpages: [
        new RouterElement('Dostępne scenariusze', 'scenario'),
        new RouterElement('Dodaj nowy scenariusz', 'scenario/new'),
        new RouterElement('Scenariusz', 'scenario', 1),
        new RouterElement('Scenariusz', 'scenario', 2),
        new RouterElement('Scenariusz', 'scenario', 3)
      ]
    },

    {
      name: "Ustawienia", subpages: [
        new RouterElement('Zmień dane', 'settings/data'),
        new RouterElement('Wyloguj', 'settings/logout')]
    },
  ];

  constructor(private router: Router,
              private auth: AuthenticationService,
              @Inject(DOCUMENT) private document: Document,
              private auth: AuthenticationService,
              dbfetch: DbPageFetchService<WaterContainer>)
  {
    this.pageIterator = new DbPageIterator<WaterContainer>(dbfetch, true);
  }

  ngOnInit(): void {
    this.pageIterator
      .init('/water/', { 'callback': () => this.initWater() })
      // .init('/anamox/', { 'callback': () => this.initAnamox() })
      // .init('/ags/', { 'callback': () => this.initAgs() })
      // .init('/scenario/', { 'callback': () => this.initScenario() });
  }

  onClick(elemenet: RouterElement): void {
    if (elemenet.id) {
      this.router.navigate([elemenet.link, elemenet.id]);
    } else if (elemenet.link === 'settings/logout') {
      this.auth.logout();
    } else if (elemenet.link === 'settings/data') {
      this.document.location.href = 'http://localhost:8000/admin/';
    } else {
      this.router.navigate([elemenet.link]);
    }
  }

  private initWater(): void {
    for (let val of this.pageIterator.results) {
      this.pages[0].subpages.push(new RouterElement('Woda', 'water', val.id));
    }
  }

  private initAnamox(): void {
    for (let val of this.pageIterator.results) {
      this.pages[1].subpages.push(new RouterElement('Reaktor', 'anamox', val.id));
    }
  }

  private initAgs(): void {
    for (let val of this.pageIterator.results) {
      this.pages[2].subpages.push(new RouterElement('Reaktor', 'ags', val.id));
    }
  }

  private initScenario(): void {
    for (let val of this.pageIterator.results) {
      this.pages[3].subpages.push(new RouterElement('Scenariusz', 'scenario', val.id));
    }
  }
}
