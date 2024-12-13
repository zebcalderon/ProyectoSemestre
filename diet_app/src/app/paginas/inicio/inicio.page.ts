import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
// import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from '@angular/fire/firestore'; nosotros usamos AngularFirestore, por lo que no sirve
// import { Auth, onAuthStateChanged } from '@angular/fire/auth'; tampoco ocupamos Auth, usamos AngularFireAuth y ya existe el servicio para ésto
import { Storage } from '@ionic/storage-angular';
import { FirebaseAuthenticationService } from 'src/app/servicios/firebase-authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild('modalContador', { static: true }) modalContador!: IonModal;
  edad: number | null = null;
  altura: number | null = null;
  peso: number | null = null;
  sexo: string = '';
  ejercicio: string = '';
  tmb: number | null = null;
  uid: string | null = null;
  calorias: number;

  constructor(
    private animationCtrl: AnimationController,
    private firestore: AngularFirestore,
    private auth: FirebaseAuthenticationService,
    private storage:Storage,
  ) {}

  ngOnInit() {
    // Detectar usuario autenticado
    this.auth.getProfile()
    .then((profileData: any) => {
      if (profileData) {
        this.uid = profileData.uid; // Asegúrate de que el perfil tiene un `uid`
        console.log('Usuario autenticado:', this.uid);
      } else {
        console.log('No hay usuario autenticado');
        this.uid = null;
      }
    })
    .catch((error) => {
      console.error('Error al obtener el perfil del usuario:', error);
      this.uid = null;
    });

    this
    this.storage.get('tmb').then((calorias) => {
      console.log('Retrieved calorias:', calorias); // Debug log
      this.calorias = calorias || 0;
    }).catch((error) => {
      console.error('Error retrieving calorias:', error);
      this.calorias = 0;
    });
  }

  cancelar(){
    if(this.modalContador){
      this.modalContador.dismiss(null, 'cancelar');
    }
   }

  async calcularTMB() {
    const peso = this.peso ?? 0;
    const altura = this.altura ?? 0;
    const edad = this.edad ?? 0;

    if (peso === 0 || altura === 0 || edad === 0 || !this.sexo || !this.ejercicio) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    if (this.sexo === 'Hombre') {
      this.tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
    } else if (this.sexo === 'Mujer') {
      this.tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
    }

    if (this.tmb !== null) {
      switch (this.ejercicio) {
        case 'ligera':
          this.tmb *= 1.375;
          break;
        case 'moderada':
          this.tmb *= 1.55;
          break;
        case 'intensa':
          this.tmb *= 1.725;
          break;
        case 'nada':
          break;
        default:
          break;
      }

      alert(`Tu TMB es: ${this.tmb.toFixed(0)} kcal/día`);

      // Guardar TMB en Firestore
      if (this.uid) {
        // const userDocRef = doc(this.firestore, `users/${this.uid}`);
        const userDocRef = this.firestore.collection('users').doc(this.uid);

        try {
          // Comprobar si ya existe un documento
          // const userDoc = await getDoc(userDocRef);
          const userDoc = await userDocRef.get().toPromise();

          if (userDoc.exists) {
            // Actualizar el documento si existe
            await userDocRef.update({
              tmb: Math.floor(this.tmb),
              updatedAt: new Date(), // AngularFirestore usa Date directamente
            });
          } else {
            // Crear un nuevo documento si no existe
            await userDocRef.set({
              tmb: Math.floor(this.tmb),
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }

          console.log('TMB guardado exitosamente en Firestore.');
          this.storage.create();
          this.storage.set('tmb', Math.floor(this.tmb));
        } catch (error) {
          console.error('Error al guardar el TMB en Firestore:', error);
        }
      } else {
        alert('No se encontró usuario autenticado. Inicia sesión para guardar tu TMB.');
      }
    }
  }
}

