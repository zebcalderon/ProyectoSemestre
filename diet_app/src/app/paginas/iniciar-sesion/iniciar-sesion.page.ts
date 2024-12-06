import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  email:    string = '';
  password: string = '';
  user:     string = '';

  constructor(
    public alerta:AlertController,
    public toast:ToastController,
    private router:Router,
    private storage:Storage,
    private loginService:FirebaseLoginService,
    private sesion_actual:Storage
  ) {}

  async MensajeCorrecto(){
    const toast = await this.toast.create({
      message: 'Inicio de sesión exitoso',
      duration: 2000
    })
    toast.present();
  }

  async MensajeError(){
    const alert = await this.alerta.create({
      header: 'Error al intentar iniciar sesión',
      subHeader: 'Credenciales incorrectas',
      message: 'No puedes ingresar con los campos usuario o contraseña vacíos.',
      buttons: ['Aceptar']
    })
    alert.present();
  }

  ingresar (){
    if (this.email ==="" || this.password==="" || this.email===""){
      console.log("No pueden haber valores vacíos.")
      this.MensajeError()
    }
    else {
      this.loginService.login(this.email, this.password).then(()=>{
        console.log("Inicio de sesión exitoso")
        this.MensajeCorrecto()
        this.sesion_actual.set('sesion', 'loggedIn')
        this.router.navigate(["/principal"])
      }).catch(()=>{
        console.log("Error al intentar iniciar sesión")
        this.MensajeError();
      });

    }
  }

  async ngOnInit() {
    await this.storage.create();
  }

}
