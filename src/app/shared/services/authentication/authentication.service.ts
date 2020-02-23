import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpClient, HttpParams } from '@angular/common/http';

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

    let params = new HttpParams();
    params = params.append('username', this.subjectUser.value.username).append('password', this.subjectUser.value.password).append('csrfmiddlewaretoken', '5NgsJTP0O2TyMkEmS8jB8ZKNZE87Kj3cG5SVm3bRYAdWYxroO7zBcEltLK1qgu39').append('next', '/admin/');
    document.cookie = 'csrftoken=mrXYBjIeXFASUuxYcwtPzqTjPtTG1YzwXJzret457dUg6Hk08vJPD5uZBzMZx9zt';

    this.http.post('/api-auth/login/', params, { 'responseType': 'text'}).subscribe(recv => console.log(recv.toString().includes('text-error')));
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
