
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getStorage, uploadString, ref, getDownloadURL, deleteObject } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private afAtuh:AngularFireAuth, private router:Router) { }

  register(email:string, password:string){
    return this.afAtuh.createUserWithEmailAndPassword(email, password);
  }

  login(email:string, password:string){
    return this.afAtuh.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.afAtuh.signOut().then(()=>{
      this.router.navigate(['/login']);
    });
  }
  
  resetPassword(email:string){
    return this.afAtuh.sendPasswordResetEmail(email)
  }

  getProfile(){
    return this.afAtuh.currentUser
  }
  // fuincion para subir una imagen
  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }

  //funcion para obtener ruta de la imagen con url para reemplazar la img ya existente
  async getFilePath(url: string) {
    return ref(getStorage(), url).fullPath;
  }

  //Eliminar el archgivo de firestorage
  deleteFile(path: string) {
    return deleteObject(ref(getStorage(), path));
  }
}
