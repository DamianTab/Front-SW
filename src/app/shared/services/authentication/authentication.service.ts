import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from '../cookie/cookie.service';
import { CookieName } from '../../models/cookie-name';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private subjectUser = new BehaviorSubject<User>(new User());
  private subjectIsLogIn = new BehaviorSubject<boolean>(false);

  public isLogIn$ = this.subjectIsLogIn.asObservable().pipe();


  constructor(
    private router: Router,
    private toastService: ToastService,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    const userCookieValue = this.cookieService.getCookieValue(CookieName.USER);
    if (userCookieValue) {
      this.subjectUser.next(JSON.parse(userCookieValue));
    }
    const isLogInCookieValue = this.cookieService.getCookieValue(CookieName.ISAUTHENTICATE);
    if (isLogInCookieValue) {
      this.subjectIsLogIn.next(JSON.parse(isLogInCookieValue));
    }
  }

  login(username: string, password: string) {
    const user = new User();
    user.username = username;
    user.password = password;
    this.setNewUser(user);

    this.tokens();
  }

  logout() {
    this.subjectUser.next(new User());
    this.subjectIsLogIn.next(false);
    this.cookieService.clearAllCookies();
    this.router.navigate(['/login']);
    this.toastService.info('Poprawnie wylogowano');
  }

  validate(): boolean {
    //todo wyscig do poprawy - DAMIAN
    if (!this.subjectUser.value) {
      return false;
    }
    console.log('WALIDACJA JEST TAKA:' + this.subjectIsLogIn.value)
    return this.subjectIsLogIn.value;
  }

  private tokens() {
    //logowanie, dostajemy automatycznie przypisywany csrf token
    //a middlewaretoken wyciagamy z inputu zapytania z formatki django

    this.http.get('/api-auth/login/', { responseType: 'text' }).subscribe(html => {
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
        .append('csrfmiddlewaretoken', middlewaretoken);

      //logujemy się do django
      return this.http.post('/api-auth/login/', params, { responseType: 'text' }).subscribe(recv => {
        console.log('CZY JEST ZALOGOWANY NORM: ' + this.checkIfIsLogin(recv));
        this.setAuthentication(false);

        // return this.parseResponse(recv).logged ? true : false;

        // //sprawdzamy czy jestesmy adminem
        // return this.http.get('/admin/auth/user/', { responseType: 'text' }).subscribe(recv => {
        //   console.log(`IS ADMIN: ${recv.includes('Welcome')}`);
        // });
      }, err => {
        let lol = err as HttpErrorResponse;
        lol = lol.error;
        console.log('CZY JEST ZALOGOWANY ERR: ' + this.checkIfIsLogin(lol));
        console.log('CZY JEST text error: ' + lol.toString().includes('text-error'));
        console.log('CZY JEST page not found: ' + lol.toString().includes('Page not found'));
        this.setAuthentication(true);
      });
    });
  }

  private setNewUser(user: User): void {
    this.cookieService.setCookieValue(CookieName.USER, JSON.stringify(user));
    this.subjectUser.next(user);
  }

  private setAuthentication(isAuthenticate: boolean): void {
    this.cookieService.setCookieValue(CookieName.ISAUTHENTICATE, JSON.stringify(isAuthenticate));
    this.subjectIsLogIn.next(isAuthenticate);
  }

  private checkIfIsLogin(recv) {
    const txt = recv.toString();
    return !txt.includes('text-error') &&
      // przejscie z formatki loginu
      txt.includes('Page not found');
  }

}
