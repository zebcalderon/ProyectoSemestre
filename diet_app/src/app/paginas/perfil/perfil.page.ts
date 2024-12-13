import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthenticationService } from 'src/app/servicios/firebase-authentication.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'; // Importar el plugin Filesystem
import { ref, uploadBytes, getDownloadURL } from '@angular/fire/storage'; // Importar el servicio de Firebase Storage
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface UserProfile {
  uid: string;
  email: string;
  username: string;
  urlPfp?: string; 
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
  urlFoto: string = ''; // URL de la foto subida a Firebase Storage
  uploadProgress: number = 0;
  uid: string = '';
  urlPfp: string = '';
  imagenPerfil: string = '';

  constructor(
    private authService: FirebaseAuthenticationService, 
    private router: Router,
    private storage: AngularFireStorage,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,) { }

  async ngOnInit() {
    
  }

  async ionViewDidEnter(){
    try {
      const profileData = await this.authService.getProfile() as UserProfile;
      if (profileData && profileData.username) {
        this.nombre = profileData.username;
      }
      await this.cargarImagenPerfil();
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
        resultType: CameraResultType.DataUrl, // Imagen como Data URL
        source: CameraSource.Camera, // Abre la cámara directamente
      });
      this.photo = image.dataUrl; // Guarda la foto en formato Data URL
      
      // Guardar la imagen localmente
      const fileName = `photo_${new Date().getTime()}.jpg`;
      const savedImage = await Filesystem.writeFile({
        path: fileName,
        data: image.dataUrl!,
        directory: Directory.Data, // Guarda en el directorio de datos
        encoding: Encoding.UTF8,
      });
      this.photoFileName = savedImage.uri; // URI de la imagen guardada
      await this.subirImagen();
      console.log('URL de la foto guardada en Firestore');
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async subirImagen(){
    const loading = await this.loadingCtrl.create({
      message:  'Subiendo imagen...'
    });
    await loading.present();

    try {
      if (!this.photo) {
        await this.showToast('Primero debes tomar una foto.');
        return;
      }
      const fileName = `perfiles/${new Date().getTime()}_${Math.random()
      .toString(36)
      .substring(2, 8)}.jpg`;

      const fileBlob = await this.makeBlob(this.photo);

      const uploadTask = this.storage.upload(fileName, fileBlob);
      uploadTask.percentageChanges().subscribe((progress) => {
        this.uploadProgress = progress; // Actualizar el progreso de carga
      });

      await uploadTask.snapshotChanges().toPromise();

      const downloadUrl = await this.storage.ref(fileName).getDownloadURL().toPromise();
      
      if(!this.uid) {
        const profileData: any = await this.authService.getProfile();
        this.uid = profileData.uid;
      }

      if (this.uid) {
        const userRef = this.firestore.collection('usuarios').doc(this.uid);
        await userRef.set({ urlPfp: downloadUrl }, { merge: true });
        console.log('URL de la foto guardada en Firestore:', downloadUrl);
        this.imagenPerfil = downloadUrl;
      } else {
        console.error('No se pudo obtener el ID del usuario.');
        await this.showToast('Error al subir la imagen.');
      }

      // const userId = await this.authService.getProfile()
      // .then((profileData: any) => {
      //   this.uid = profileData.uid;
      // });

      await this.showToast('Imagen subida con éxito.');
      console.log('URL de descarga:', downloadUrl);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      await this.showToast('Error al subir la imagen.');
    } finally {
      await loading.dismiss();
    }
  }

  async cargarImagenPerfil() {
    try {
      if(!this.uid) {
        const profileData: any = await this.authService.getProfile();
        this.uid = profileData.uid;
      }

      const userRef = this.firestore.collection('usuarios').doc(this.uid);
      const userDoc = await userRef.get().toPromise();

      if (userDoc.exists){
        const userData = userDoc.data() as UserProfile;
        if (userData?.urlPfp) {
          this.imagenPerfil = userData.urlPfp;
          console.log('URL de la foto de perfil:', this.imagenPerfil);
        } else {
          console.warn('No se encontró una imagen de perfil.');
          this.imagenPerfil = 'ruta/a/imagen/predeterminada.png'; // Imagen predeterminada
        }
      } else {
        console.warn('El documento del usuario no existe.');
      }
    } catch (error) {
      console.error('Error al cargar la imagen de perfil:', error);
    }
  }

  private async makeBlob(dataUrl: string): Promise<Blob> {
    // Convierte un Data URL en un Blob.
    const response = await fetch(dataUrl);
    return await response.blob();
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }
}
