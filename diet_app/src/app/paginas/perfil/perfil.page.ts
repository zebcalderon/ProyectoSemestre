import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthenticationService } from 'src/app/servicios/firebase-authentication.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'; // Importar el plugin Filesystem

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
  photo: string | undefined; // Foto tomada por la cámara
  photoFileName: string = ''; // Nombre del archivo de la foto (opcional)

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

  // Método para navegar entre páginas
  navigate(route: string) {
    this.router.navigateByUrl(route);
  }

  // Método para tomar una foto con la cámara
  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl, // Obtiene la imagen como Data URL
        source: CameraSource.Camera, // Abre la cámara directamente
      });
      this.photo = image.dataUrl; // Almacena la foto en la propiedad `photo`
      
      // Guardar la imagen localmente
      const fileName = `photo_${new Date().getTime()}.jpg`;
      const savedImage = await Filesystem.writeFile({
        path: fileName,
        data: image.dataUrl!,
        directory: Directory.Data, // Guarda en el directorio de datos
        encoding: Encoding.UTF8,
      });

      this.photoFileName = savedImage.uri; // Guarda la URI de la imagen almacenada
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
}
