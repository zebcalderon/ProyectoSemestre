import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NavController } from '@ionic/angular';
import { Firestore, collection, addDoc, Timestamp } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage {
  // Propiedades de la receta
  titulo: string = ''; // Título de la receta
  instrucciones: string = ''; // Instrucciones de la receta
  ingredientes: string = ''; // Ingredientes de la receta
  foto: string = 'assets/imagenes/camara.png'; // Foto por defecto

  constructor(
    private navController: NavController,
    private firestore: Firestore // Servicio Firestore
  ) {}

  // Función para tomar una foto con la cámara
  async tomarPhoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera, // Abre la cámara
        quality: 90,
      });
      this.foto = image.dataUrl || this.foto;
    } catch (error) {
      console.error('Error al tomar foto:', error);
      alert('No se pudo acceder a la cámara.');
    }
  }

  // Función para seleccionar una foto de la galería
  async seleccionarPhoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos, // Abre la galería
        quality: 90,
      });
      this.foto = image.dataUrl || this.foto;
    } catch (error) {
      console.error('Error al seleccionar foto:', error);
      alert('No se pudo acceder a la galería.');
    }
  }

  // Función para subir la receta a Firestore
  async uploadReceta() {
    if (!this.titulo || !this.instrucciones || !this.ingredientes) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    const recetaData = {
      title: this.titulo,
      instructions: this.instrucciones,
      ingredients: this.ingredientes,
      photoUrl: this.foto,
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      const recetaCollection = collection(this.firestore, 'recetas');
      await addDoc(recetaCollection, recetaData);
      alert('Receta subida exitosamente.');
      this.goBack();
    } catch (error) {
      console.error('Error al subir la receta:', error);
      alert('Hubo un error al subir la receta.');
    }
  }

  // Función para redirigir a la página anterior
  goBack() {
    this.navController.back();
  }
}
