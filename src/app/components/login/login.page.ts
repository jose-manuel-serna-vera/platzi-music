import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from 'src/app/services/api/auth/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  public validator_msg = {
    email: [
      { type: "required", message: "El email es requerido." },
      { type: "pattern", message: "Este email es incorrecto." }
    ],
    password: [
      { type: "required", message: "El passwrod es requerido." },
      { type: "minlength", message: "minimo 5 letras para el password." }
    ]
  }


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticateService,
    private storage: Storage
  ) {

    this.loginForm = this.formBuilder.group({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      password: new FormControl("", Validators.compose([
        Validators.minLength(5),
      ])),

    });

  }

  ngOnInit() {
    this.storage.create();
  }

  loginUser(credentials) {
    console.log(credentials);
    this.authService.loginUser(credentials).then(res => {
      this.errorMessage = "";
      this.storage.set("isUserLoggedIn", true);
      this.router.navigate(['/menu/home']);
    }).catch(error => {
      this.errorMessage = error;
    })
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

}
