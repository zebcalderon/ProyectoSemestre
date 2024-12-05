import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

interface UserProfile {
  uid: string;
  email: string;
  nombre: string;
  createdAt?: any; // Adjust type as needed
}
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  isLoggedIn: boolean = false;
  nombre: string = '';

  constructor(private authService: AuthenticationService, public router: Router) {}
  
  async ngOnInit() {
    try {
      const profileData = await this.authService.getProfile() as UserProfile;
      if (profileData && profileData.nombre) {
        this.nombre = profileData.nombre;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      this.isLoggedIn = false;
    }
  }

  async signOut() {
    try {
      await this.authService.signOut();
      console.log("User signed out successfully");

      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
}
