import { Component, OnInit, Inject } from '@angular/core';
import { RouterElement } from './models/router-element';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: "sw-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {

  pages = [
    {
      name: "Woda", subpages: [
        new RouterElement('Woda', 'water', 1),
        new RouterElement('Woda', 'water', 2),
        new RouterElement('Woda', 'water', 3)]
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
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void { }

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

}
