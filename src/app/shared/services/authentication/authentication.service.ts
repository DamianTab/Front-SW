import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private readonly COOKIE_VALUE = 'user';

  subjectUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.COOKIE_VALUE)));

  constructor(
    private router: Router,
    private toastService: ToastService,
    private http: HttpClient
  ) {

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
    this.toastService.info('Poprawnie wylogowano');
  }

  validate(): boolean {
    //todo wyscig do poprawy - DAMIAN
    if (!this.subjectUser.value) {
      return false;
    }
    this.http.post('http://127.0.0.1:8000/admin', {
      'username': this.subjectUser.value.username,
      'password': this.subjectUser.value.password,
      'next': '/admin/'
    }).subscribe(recv => console.log(recv));
    return this.subjectUser.value.username === 'admin' && this.subjectUser.value.password === 'admin';
  }

  onUserChange(): Observable<User> {
    return this.subjectUser.asObservable();
  }

  private setNewUser(user: User): void {
    this.subjectUser.next(user);
    localStorage.setItem(this.COOKIE_VALUE, JSON.stringify(user));
  }

}
