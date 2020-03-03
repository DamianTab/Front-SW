import { Injectable } from '@angular/core';
import { CookieService as CookieServiceExternal } from 'ngx-cookie-service';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private cookieServiceExternal: CookieServiceExternal,
              private encryptionService: EncryptionService) { }


  public setCookieValue(cookieName: string, value: string, lifeTime?, isSecure = false) {
    // name, value, ?expires, ?path, ?domain, ?secure, ?sameSite
    const encrypt = this.encryptionService.encrypt(value);
    this.cookieServiceExternal.set(cookieName, encrypt, lifeTime, undefined, undefined, isSecure);
  }

  public getCookieValue(cookieName: string): string {
    const decryptedCookie = this.cookieServiceExternal.get(cookieName);
    return this.encryptionService.decrypt(decryptedCookie);
  }

  public clearAllCookies() {
    // ?path,?domain
    this.cookieServiceExternal.deleteAll();
  }
}
