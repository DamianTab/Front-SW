import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  user: User = new User();

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    this.user = new User();
    this.user.username = username;
    this.user.password = password;
    console.log("WPISYWANIE DANYCH DZIALA")
  }

  logout() {
    this.user = new User();
  }

  validate(): boolean {
    return this.user.username === 'admin' && this.user.password === 'admin';
  }
}
