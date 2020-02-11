import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private readonly COOKIE_VALUE = 'user';

  subjectUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.COOKIE_VALUE)));

  constructor(private router: Router) {
  }

  login(username: string, password: string) {
    const user = new User();
    user.username = username;
    user.password = password;
    this.setNewUser(user);
  }

  logout() {
    const user = new User();
    this.setNewUser(user);
    this.router.navigate(['/login']);
  }

  validate(): boolean {
    if (!this.subjectUser.value) {
      return false;
    }
    return this.subjectUser.value.username === 'admin' && this.subjectUser.value.password === 'admin';
  }

  onUserChange(): Observable<User> {
    return this.subjectUser.asObservable();
  }

  private setNewUser(user: User): void {
    localStorage.setItem(this.COOKIE_VALUE, JSON.stringify(user));
    this.subjectUser.next(user);
  }

}
