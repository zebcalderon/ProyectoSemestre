import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  isLoggedIn: boolean = false;
  nombre: string = 'Invitado';

  constructor(
    private sesion_actual: Storage,
    private authService: FirebaseLoginService,
    public router: Router,
    private navController: NavController,
  ) { }

  ngOnInit() {
    this.sesion_actual.create();
    this.sesion_actual.get('sesion').then((sesion) => {
      if (sesion == 'loggedOut') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  signOut() {
    try {
      this.authService.logout();
      console.log("Usuario correctamente deslogueado");

      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Error al intentar desloguear:", error);
    }
  }

  goBack(){
    this.navController.back();
  }
  
}
