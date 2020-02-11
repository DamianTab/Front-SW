import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  subjectUser = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const user = new User();
    user.username = username;
    user.password = password;
    this.subjectUser.next(user);
  }

  logout() {
    const user = new User();
    this.subjectUser.next(user);
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

}
