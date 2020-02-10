import { Component, OnInit } from '@angular/core';
import { RouterElement } from './models/router-element';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
  }

  ngOnInit(): void { }

  onClick(elemenet: RouterElement): void {
    // console.log(elemenet.name);
    // console.log(elemenet.link, elemenet.id);
    if (elemenet.id) {
      this.router.navigate([elemenet.link, elemenet.id]);
      // this.router.navigateByUrl('/' + elemenet.link + '/' + elemenet.id);
    } else {
      this.router.navigate([elemenet.link]);
      // this.router.navigateByUrl('/' + elemenet.link);
    }
    // console.log(this.router.url);
  }

}
