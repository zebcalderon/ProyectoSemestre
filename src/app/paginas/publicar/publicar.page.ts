import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage {
  photo: string | null = null;

  constructor() {}

  // Función para tomar una foto con la cámara
  async takePhoto() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera, // Esto asegura que se abra la cámara
      quality: 90,
    });
    this.photo = image.dataUrl || null;
  }

  // Función para seleccionar una foto de la galería
  async selectPhoto() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos, // Abre la galería en lugar de la cámara
      quality: 90,
    });
    this.photo = image.dataUrl || null;
  }

  // Nueva función para elegir entre tomar foto o seleccionar de la galería
  async takeOrUploadPhoto() {
    const action = prompt('¿Deseas tomar una foto o subir desde la galería? Escribe "tomar" o "subir".');

    if (action === 'tomar') {
      await this.takePhoto(); // Llama a tu método para tomar la foto
    } else if (action === 'subir') {
      await this.selectPhoto(); // Llama a tu método para seleccionar de la galería
    } else {
      alert('Acción no válida');
    }
  }

  publicarReceta() {
    console.log("Receta publicada");
  }
}
