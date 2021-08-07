import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private storage: Storage
  ) { }

  loginUser(credentials: any) {

    return new Promise((accept, reject) => {

      this.storage.get("user").then(res => {
        credentials.password = btoa(credentials.password);
        if (res == null) {
          reject("Debe registrarse");
          return;
        }
        if (credentials.email == res.email && credentials.password == res.password) {
          accept("Login Correcto");
        } else {
          reject("login Incorrecto");
        }
      });
    })
  }

  registerUser(userData: any) {
    return this.storage.set("user", userData);
  }
}
