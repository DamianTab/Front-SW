import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class NoResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).
      pipe(timeout(10000), catchError(() => { this.router.navigate(['/disconnected']); return of(null); }));
  }
}
