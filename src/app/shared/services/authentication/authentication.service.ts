import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private readonly COOKIE_VALUE = 'user';
  private subjectUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.COOKIE_VALUE)));
  private isLogInSubject = new BehaviorSubject<boolean>(false);

  public subjectUser$ = this.subjectUser.asObservable();
  public isLogIn$ = this.isLogInSubject.asObservable();


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

    this.tokens();
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
    console.log('WALIDACJA JEST TAKA:' + this.isLogInSubject.value)
    return this.isLogInSubject.value;
  }

  private tokens(){
    //logowanie powtarza sie 2krotnie z powodu authguard, dostajemy automatycznie przypisywany csrf token
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
        console.log('CZY JEST ZALOGOWANY NORM: ' + this.parseResponse(recv));
        this.isLogInSubject.next(false);

        // return this.parseResponse(recv).logged ? true : false;

        // //sprawdzamy czy jestesmy adminem
        // return this.http.get('/admin/auth/user/', { responseType: 'text' }).subscribe(recv => {
        //   console.log(`IS ADMIN: ${recv.includes('Welcome')}`);
        // });
      }, err => {
        let lol = err as HttpErrorResponse;
        lol = lol.error;

        // console.log('CZY JEST to taka klasa: ' + lol);
        console.log('CZY JEST ZALOGOWANY ERR: ' + this.parseResponse(lol));
        console.log('CZY JEST text error: ' + lol.toString().includes('text-error'));
        console.log('CZY JEST page not found: ' + lol.toString().includes('Page not found'));
        // console.log(err)
        this.isLogInSubject.next(true);
      });
    });
  }

  private setNewUser(user: User): void {
    this.subjectUser.next(user);
    localStorage.setItem(this.COOKIE_VALUE, JSON.stringify(user));
  }

  private parseResponse(recv) {
    const txt = recv.toString();
    return !txt.includes('text-error') && txt.includes('Page not found') //przejscie z formatki loginu
  }

}
