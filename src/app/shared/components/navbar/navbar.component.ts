import { Component, OnInit } from '@angular/core';
import { RouterElement } from './models/router-element';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DbPageIterator } from '../../services/db-page/db-page-iterator.service';
import { WaterContainer } from '../../models/water-container';
import { DbPageFetchService } from '../../services/db-page/db-page-fetch.service';

@Component({
  selector: "sw-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {

  pages = [
    {
      name: "Woda", subpages: []
    },

    {
      name: "Anamox", subpages: []
    },
    {
      name: "Ags", subpages: []
    },

    {
      name: "Scenariusz", subpages: [
        new RouterElement('Dostępne scenariusze', 'scenario'),
        new RouterElement('Dodaj nowy scenariusz', 'scenario/new'),
      ]
    },

    {
      name: "Ustawienia", subpages: [
        new RouterElement('Zmień dane', 'settings/data'),
        new RouterElement('Wyloguj', 'settings/logout')]
    },
  ];

  private pageIterator: DbPageIterator<WaterContainer>;

  constructor(private router: Router,
    private auth: AuthenticationService,
    dbfetch: DbPageFetchService<WaterContainer>
  ) {
    this.pageIterator = new DbPageIterator<WaterContainer>(dbfetch, true);
  }

  ngOnInit(): void {
    this.pageIterator
      .init('/water/', () => this.initWater())
      .init('/anamox/', () => this.initAnamox())
      .init('/ags/', () => this.initAgs())
      .init('/scenario/', () => this.initScenario());
  }

  onClick(elemenet: RouterElement): void {
    if (elemenet.id) {
      this.router.navigate([elemenet.link, elemenet.id]);
    } else if (elemenet.link === 'settings/logout') {
      this.auth.logout();
    } else {
      this.router.navigate([elemenet.link]);
    }
  }

  private initWater(): void {
    for (let val of this.pageIterator.results) {
      this.pages[0].subpages.push(new RouterElement('Woda', 'container-water', val.id));
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
