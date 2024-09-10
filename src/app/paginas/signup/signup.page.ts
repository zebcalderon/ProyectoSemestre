import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  correo: string = '';
  nombre: string = '';
  password: string = '';
  errors: any = {};

  constructor() { }

  ngOnInit() {}

  validateFields() {
    this.errors = {};

    if (!this.correo.includes('@') || !this.correo.includes('.')) {
      this.errors.correoError = 'El correo electrónico debe incluir "@" y "."';
    }

    if (this.nombre.length < 3 || this.nombre.length > 30) {
      this.errors.nombreError = 'El nombre de usuario debe tener entre 3 y 30 caracteres';
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordPattern.test(this.password)) {
      this.errors.passwordError = 'La contraseña debe tener entre 8 y 20 caracteres, incluir mayúsculas, minúsculas, números y símbolos';
    }

    return this.errors;
  }

  onRegister() {
    if (Object.keys(this.validateFields()).length === 0) {
      console.log('Registro exitoso');
    }
  }
}
