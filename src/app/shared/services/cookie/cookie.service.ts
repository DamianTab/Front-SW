import { Injectable } from '@angular/core';
import { CookieService as CookieServiceExternal } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private cookieServiceExternal: CookieServiceExternal) { }


  setCookieValue(cookieName: string, value: string, isSecure = false) {
    // name, value, ?expires, ?path, ?domain, ?secure, ?sameSite
    console.log("to SET jest cookie: " + value);
    this.cookieServiceExternal.set(cookieName, value, undefined, undefined, undefined, isSecure);
  }

  getCookieValue(cookieName: string): string {
    console.log("to GET jest cookie: " + this.cookieServiceExternal.get(cookieName));
    return this.cookieServiceExternal.get(cookieName);
  }

  clearAllCookies() {
    // ?path,?domain
    this.cookieServiceExternal.deleteAll();
  }
}
