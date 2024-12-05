import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // Guardar la receta en Firestore
  saveRecipe(recipeData: any): Promise<any> {
    return this.firestore.collection('recipes').add(recipeData);
  }

  // Subir una foto a Firebase Storage y obtener la URL de descarga
  uploadPhoto(file: File): Observable<string> {
    const filePath = `recipes_photos/${Date.now()}_${file.name}`; // Ruta única para la imagen
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Devuelve el observable que emitirá la URL de la imagen cuando se haya subido
    return task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL())
    );
  }
}
