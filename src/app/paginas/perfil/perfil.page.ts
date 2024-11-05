import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';


interface UserProfile {
  uid: string;
  email: string;
  nombre: string;
  createdAt?: any;
}
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string = '';

  constructor(private authService: AuthenticationService) { }

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


}
