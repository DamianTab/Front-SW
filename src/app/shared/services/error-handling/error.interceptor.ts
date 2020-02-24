import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../authentication/authentication.service';
import { ToastService } from '../toast/toast.service';

@Injectable()
export class ExternalErrorHandler implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private toastService: ToastService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            else {
                if (err.status  >= 500 && err.status < 600) {
                    this.toastService.error("Server error: " + err.message);   
                } else if (err.status >= 400) {
                    this.toastService.error("Client error: " + err.message);
                } else {
                    this.toastService.error("Error: " + err.message);
                }
            }
            const error = err.error.message || err.statusText;
            return throwError(err);
        }));
    }
}
