import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private keys = '123456$#@$^@1ERF';

  encrypt(value): string {
    const key = CryptoJS.enc.Utf8.parse(this.keys);
    const iv = CryptoJS.enc.Utf8.parse(this.keys);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();
  }

  decrypt(value): string {
    const key = CryptoJS.enc.Utf8.parse(this.keys);
    const iv = CryptoJS.enc.Utf8.parse(this.keys);
    const decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
