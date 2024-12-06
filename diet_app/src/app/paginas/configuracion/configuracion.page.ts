import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { FirebaseAuthenticationService } from 'src/app/servicios/firebase-authentication.service';

interface UserProfile {
  uid: string;
  email: string;
  username: string;
}

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  isLoggedIn: boolean = false;
  nombre: string;

  constructor(
    private sesion_actual: Storage,
    private authService: FirebaseLoginService,
    public router: Router,
    private navController: NavController,
    private perfil: FirebaseAuthenticationService
  ) { }

  ngOnInit() {
    this.sesion_actual.create();
    this.sesion_actual.get('sesion').then((sesion) => {
      if (sesion == 'loggedIn') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
    try {
      this.perfil.getProfile().then((profileData: UserProfile) => {
        if (profileData && profileData.username) {
          this.nombre = profileData.username;
        }
      }).catch((error) => {
        console.error("Error fetching profile data:", error);
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }

  signOut() {
    try {
      this.authService.logout();
      console.log("Usuario correctamente deslogueado");
    } catch (error) {
      console.error("Error al intentar desloguear:", error);
    }
  }

  goBack(){
    this.navController.back();
  }
  
}
