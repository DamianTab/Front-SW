import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../shared/services/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.user;
        console.log("CAN ACTIVATE DZIALA");
        if (currentUser.username === 'admin' && currentUser.password === 'admin') {
            // authorised so return true
            console.log("CAN ACTIVATE -- TRUE");
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        // this.router.navigate(['/login']);
        console.log("CAN ACTIVATE -- FALSE");
        return false;
    }
}
