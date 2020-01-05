import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  pages = [
    { name: "Woda", subpages: ["Woda 1", "Woda 2", "Woda 3"] },
    { name: "Ścieki", subpages: ["Reaktor 1", "Reaktor 2", "Reaktor 3"] },
    { name: "Anamox", subpages: ["Reaktor 1", "Reaktor 2", "Reaktor 3"] },
    { name: "Scenariusze", subpages: ["Dostępne scenariusze", "Dodaj nowy scenariusz", "Opcje"] },
    { name: "Ustawienia", subpages: ["Zmień dane", "Wyloguj"] }
  ];

  onClick(name) {
    console.log(name);
  }

  constructor() {}

  ngOnInit() {}
}
