import { Component, OnInit } from '@angular/core';
import { RouterElement } from './models/router-element';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DbPageIterator } from '../../services/db-page/db-page-iterator.service';
import { WaterContainer } from '../../models/water-container';

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
      name: "Anamox", subpages: [
        new RouterElement('Reaktor', 'anamox', 1),
        new RouterElement('Reaktor', 'anamox', 2),
        new RouterElement('Reaktor', 'anamox', 3)]
    },
    {
      name: "Ags", subpages: [
        new RouterElement('Reaktor', 'ags', 1),
        new RouterElement('Reaktor', 'ags', 2),
        new RouterElement('Reaktor', 'ags', 3)]
    },

    {
      name: "Scenariusz", subpages: [
        new RouterElement('Dostępne scenariusze', 'scenario'),
        new RouterElement('Dodaj nowy scenariusz', 'scenario/new'),
        new RouterElement('Scenariusz', 'scenario', 1),
        new RouterElement('Scenariusz', 'scenario', 2),
        new RouterElement('Scenariusz', 'scenario', 3)]
    },

    {
      name: "Ustawienia", subpages: [
        new RouterElement('Zmień dane', 'settings/data'),
        new RouterElement('Wyloguj', 'settings/logout')]
    },
  ];

  constructor(private router: Router,
    private auth: AuthenticationService,
    private pageIterator: DbPageIterator<WaterContainer>) { 
      
    }

  ngOnInit(): void {
    this.pageIterator.init('/water/', () => this.initWater());
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
}
