import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo: string = '';
  password: string = '';

  constructor(public alerta:AlertController, public toast:ToastController, private router:Router, private storage : Storage, private loginFirebase:FirebaseLoginService) {}

  async MensajeCorrecto(){
    const toast = await this.toast.create({
      message: 'Inicio de sesión correcto',
      duration: 2000
    })
    toast.present();
  }

  async MensajeError(){
    const alert = await this.alerta.create({
      header: 'Error de Inicio',
      subHeader: 'Contraseña o correo erróneo',
      message: 'No puede ingresar con los campos usuaio y contraseña vacíos',
      buttons: ['Aceptar']
    })
    alert.present();
  }

  ingresar (){
    if (this.correo ==="" || this.password==="" || this.correo===""){
      console.log("No puede haber valores vacíos.")
      this.MensajeError()
    }
    else {
      this.loginFirebase.login(this.correo, this.password).then(()=>{
        this.storage.set("SessionID", true)
        console.log("Inicio de sesión exitoso")
        this.MensajeCorrecto()
        this.router.navigate(["/principal"])
      }).catch(()=>{
        console.log("Error al iniciar sesión")
        this.MensajeError();
      });

    }
  }

  async ngOnInit() {
    await this.storage.create();
  }
}