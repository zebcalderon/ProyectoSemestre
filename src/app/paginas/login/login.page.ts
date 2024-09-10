import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombre: string = '';
  password: string = '';
  nombreError = ''; 
  passwordError = ''; 

  constructor() {}

  ngOnInit() {}

  validateNombre() {
    this.nombreError =
      !this.nombre
        ? 'El nombre es requerido.'
        : this.nombre.length < 3
        ? 'El nombre debe tener al menos 3 caracteres.'
        : this.nombre.length > 30
        ? 'El nombre no puede exceder los 30 caracteres.'
        : '';
  }


  validatePassword() {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-/])[A-Za-z\d@$!%*?&]{8,20}$/;
    this.passwordError =
      !this.password
        ? 'La contraseña es requerida.'
        : this.password.length < 8 || this.password.length > 20
        ? 'La contraseña debe tener entre 8 y 20 caracteres.'
        : !pattern.test(this.password)
        ? 'La contraseña debe incluir mayúsculas, minúsculas, números y signos.'
        : '';
  }

  onLogin() {
    this.validateNombre();
    this.validatePassword();

    if (!this.nombreError && !this.passwordError) {
      console.log('Inicio de sesión exitoso');
    } else {
      console.log('Errores:', this.nombreError, this.passwordError);
    }
  }
}
