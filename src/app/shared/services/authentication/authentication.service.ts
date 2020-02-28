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

  private readonly LOGIN_URL = '/api-auth/login/';
  private readonly CHECK_IF_ADMIN_URL = '/admin/auth/user/';

  private subjectUser = new BehaviorSubject<User>(new User());
  private subjectIsLogIn = new BehaviorSubject<boolean>(false);
  private subjectIsAdmin = new BehaviorSubject<boolean>(false);

  public isLogIn$ = this.subjectIsLogIn.asObservable();
  public isAdmin$ = this.subjectIsAdmin.asObservable();


  constructor(
    private router: Router,
    private toastService: ToastService,
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    const userCookieValue = this.cookieService.getCookieValue(CookieName.USER);
    if (userCookieValue) {
      this.subjectUser.next(JSON.parse(userCookieValue));
    }
    const isLogInCookieValue = this.cookieService.getCookieValue(CookieName.ISAUTHENTICATE);
    if (isLogInCookieValue) {
      this.subjectIsLogIn.next(JSON.parse(isLogInCookieValue));
    }
    const isAdminCookieValue = this.cookieService.getCookieValue(CookieName.ISADMIN);
    if (isAdminCookieValue) {
      this.subjectIsAdmin.next(JSON.parse(isAdminCookieValue));
    }
  }

  login(username: string, password: string) {
    const user = new User();
    user.username = username;
    user.password = password;
    this.setNewUser(user);

    this.setTokens();
  }

  logout() {
    this.subjectUser.next(new User());
    this.subjectIsLogIn.next(false);
    this.subjectIsAdmin.next(false);
    this.cookieService.clearAllCookies();
    this.router.navigate(['/login']);
    this.toastService.info('Poprawnie wylogowano');
  }

  validate(): boolean {
    if (!this.subjectUser.value) {
      return false;
    }
    return this.subjectIsLogIn.value;
  }

  private setTokens() {
    //logowanie, dostajemy automatycznie przypisywany csrf token
    //a middlewaretoken wyciagamy z inputu zapytania z formatki django

    this.http.get(this.LOGIN_URL, { responseType: 'text' }).subscribe(html => {
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

      // Logujemy się do django. Tutaj jest odwrotna logika.
      // Tzn gdy przyjdzie błąd 404 to znaczy że przeszło logowanie i próbuje przekierować na inną strone.
      // Jak zwróci normalnie to w przypadku gdy niepoprawne dane logowania.
      return this.http.post(this.LOGIN_URL, params, { responseType: 'text' }).subscribe(recv => {
        this.setAuthentication(false);
      }, err => {
        const errorObject = (err as HttpErrorResponse).error;
        if (this.checkIfIsLogin(errorObject)) {
          this.setAuthentication(true);
          return this.http.get(this.CHECK_IF_ADMIN_URL, { responseType: 'text' }).subscribe(recv => {
            this.setAdminStatus(this.checkIfAdmin(recv));
          });

        } else {
          this.setAuthentication(false);
        }
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

  private setAdminStatus(isAdmin: boolean): void {
    this.cookieService.setCookieValue(CookieName.ISADMIN, JSON.stringify(isAdmin));
    this.subjectIsAdmin.next(isAdmin);
  }

  private checkIfIsLogin(recv) {
    const txt = recv.toString();
    return !txt.includes('text-error') &&
      // przejscie z formatki loginu
      txt.includes('Page not found');
  }

  private checkIfAdmin(recv) {
    return recv.includes('Welcome');
  }

}
