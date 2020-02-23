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

    //logowanie powtarza sie 2krotnie z powodu authguard, dostajemy automatycznie przypisywany csrf token
    //a middlewaretoken wyciagamy z inputu zapytania z formatki django


    this.http.get('/api-auth/login/', { 'responseType': 'text' }).toPromise()
      .then(html => {
        const middlewaretoken = $('<div>')
          .append(html)
          .addBack()
          .find('input[name="csrfmiddlewaretoken"]')
          .val()
          .toString();

        let params = new HttpParams();
        params = params
          .append('username', this.subjectUser.value.username)
          .append('password', this.subjectUser.value.password)
          .append('next', '')
          .append('csrfmiddlewaretoken', middlewaretoken)
          .append('submit', 'Log in');

        //logujemy się do django
        return this.http.post('/api-auth/login/', params, { 'responseType': 'text' }).toPromise();
      })
      .then(recv => this.parseResponse(recv).logged)
      .catch(error => {
        this.parseResponse(error.error).logged;

        //sprawdzamy czy jestesmy adminem
        return this.http.get('/admin/auth/user/', { 'responseType': 'text' }).toPromise()
      })
      .then(recv => console.log(`IS ADMIN: ${recv.includes('Welcome')}`));

    return false;
  }

  onUserChange(): Observable<User> {
    return this.subjectUser.asObservable();
  }

  private setNewUser(user: User): void {
    this.subjectUser.next(user);
    localStorage.setItem(this.COOKIE_VALUE, JSON.stringify(user));
  }

  private parseResponse(recv) {
    const txt = recv.toString();
    return {
      'logged': !txt.includes('text-error') && txt.includes('Page not found') //przejscie z formatki loginu
    }
  }

}
