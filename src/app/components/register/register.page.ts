import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from 'src/app/services/api/auth/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  public validator_msg = {
    nombre: [
      { type: "required", message: "El nombre es requerido." },
      { type: "pattern", message: "Este nombre es incorrecto." }
    ],
    apellido: [
      { type: "required", message: "El apellido es requerido." },
      { type: "pattern", message: "Este apellido es incorrecto." }
    ],
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

    this.registerForm = this.formBuilder.group({
      nombre: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      apellido: new FormControl("", Validators.compose([
        Validators.required,
      ])),
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

  register(userData) {

    userData.password = btoa(userData.password);
    this.authService.registerUser(userData).then(res => {
      this.router.navigate(['/login']);
    }).catch(error => {

    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
