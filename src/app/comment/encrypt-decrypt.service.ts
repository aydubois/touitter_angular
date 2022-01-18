import { Injectable } from '@angular/core'
import * as CryptoJS from 'crypto-js'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})

export class EncryptDecryptService {
  salt = environment.salt
  constructor() { }
  

  encrypt(value:string){
    var key = CryptoJS.enc.Utf8.parse(this.salt)
    var iv = CryptoJS.enc.Utf8.parse(this.salt)
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  }

  decrypt(value:string){
    var key = CryptoJS.enc.Utf8.parse(this.salt)
    var iv = CryptoJS.enc.Utf8.parse(this.salt)
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })

    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}