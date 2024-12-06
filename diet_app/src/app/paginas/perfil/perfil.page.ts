import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthenticationService } from 'src/app/servicios/firebase-authentication.service';

interface UserProfile {
  uid: string;
  email: string;
  username: string;
}
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string = '';

  constructor(private authService: FirebaseAuthenticationService, private router: Router) { }

  async ngOnInit() {
    try {
      const profileData = await this.authService.getProfile() as UserProfile;
      if (profileData && profileData.username) {
        this.nombre = profileData.username;
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }

  navigate(route: string) {
    this.router.navigateByUrl(route);
  }

}
