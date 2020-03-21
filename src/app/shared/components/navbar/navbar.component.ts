import { Component, OnInit, Inject } from '@angular/core';
import { RouterElement } from './models/router-element';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DOCUMENT } from '@angular/common';
import { DbPageIteratorDirective } from '../../services/db-page/db-page-iterator.service';
import { WaterContainer } from '../../models/water-container';
import { DbPageFetchService } from '../../services/db-page/db-page-fetch.service';

@Component({
  /* tslint:disable-next-line */
  selector: 'sw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  private pageIterator: DbPageIteratorDirective<WaterContainer>;
  
  pages = [
    {
      name: 'Woda',
      subpages: []
    },
    {
      name: 'Anamox',
      subpages: [
        new RouterElement('Reaktor', 'anamox', 1),
        new RouterElement('Reaktor', 'anamox', 2),
        new RouterElement('Reaktor', 'anamox', 3)
      ]
    },
    {
      name: 'Ags',
      subpages: [
        new RouterElement('Reaktor', 'ags', 1),
        new RouterElement('Reaktor', 'ags', 2),
        new RouterElement('Reaktor', 'ags', 3)
      ]
    },
    {
      name: 'Scenariusz',
      subpages: [
        new RouterElement('Dostępne scenariusze', 'scenario'),
        new RouterElement('Dodaj nowy scenariusz', 'scenario/new'),
        new RouterElement('Scenariusz', 'scenario', 1),
        new RouterElement('Scenariusz', 'scenario', 2),
        new RouterElement('Scenariusz', 'scenario', 3)
      ]
    },
    {
      name: 'Ustawienia',
      subpages: [
        new RouterElement('Zmień dane', 'settings/data'),
        new RouterElement('Wyloguj', 'settings/logout')
      ]
    }
  ];

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private auth: AuthenticationService,
    dbfetch: DbPageFetchService<WaterContainer>
  ) {
    this.pageIterator = new DbPageIteratorDirective<WaterContainer>(
      dbfetch,
      true
    );
  }

  ngOnInit(): void {
    this.pageIterator.init('/water/', { callback: () => this.initWater() });
    // .init('/anamox/', { 'callback': () => this.initAnamox() })
    // .init('/ags/', { 'callback': () => this.initAgs() })
    // .init('/scenario/', { 'callback': () => this.initScenario() });
  }

  public onClick(element: RouterElement): void {
    if (element.id) {
      this.router.navigate([element.link, element.id]);
    } else if (element.link === 'settings/logout') {
      this.auth.logout();
    } else if (element.link === 'settings/data') {
      this.document.location.href = 'http://localhost:8000/admin/';
    } else {
      this.router.navigate([element.link]);
    }
  }

  private initWater(): void {
    for (const val of this.pageIterator.results) {
      this.pages[0].subpages.push(new RouterElement('Woda', 'water', val.id));
    }
  }

  private initAnamox(): void {
    for (const val of this.pageIterator.results) {
      this.pages[1].subpages.push(
        new RouterElement('Reaktor', 'anamox', val.id)
      );
    }
  }

  private initAgs(): void {
    for (const val of this.pageIterator.results) {
      this.pages[2].subpages.push(new RouterElement('Reaktor', 'ags', val.id));
    }
  }

  private initScenario(): void {
    for (const val of this.pageIterator.results) {
      this.pages[3].subpages.push(
        new RouterElement('Scenariusz', 'scenario', val.id)
      );
    }
  }
}
