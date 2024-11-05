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
  nombre: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}
  
  async ngOnInit() {
    try {
      const profileData = await this.authService.getProfile() as UserProfile;
      if (profileData && profileData.nombre) {
        this.nombre = profileData.nombre;
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
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
