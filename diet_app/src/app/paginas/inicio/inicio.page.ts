import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FirebaseAuthenticationService } from 'src/app/servicios/firebase-authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface UserData {
  tmb?: number;
  updatedAt?: { toDate: () => Date };
}

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
  calorias: number = 0;
  fechaCalculo: string | null = null; // Variable para la fecha del cálculo

  constructor(
    private animationCtrl: AnimationController,
    private firestore: AngularFirestore,
    private auth: FirebaseAuthenticationService,
    private storage: Storage
  ) {}

  ngOnInit() {
    // Detectar usuario autenticado
    this.auth.getProfile()
      .then((profileData: any) => {
        if (profileData) {
          this.uid = profileData.uid;
          console.log('Usuario autenticado:', this.uid);

          // Limpiar datos locales al cambiar de usuario
          this.calorias = 0;
          this.fechaCalculo = null;

          // Recuperar datos del usuario desde Firestore
          const userDocRef = this.firestore.collection('users').doc(this.uid);
          userDocRef.get().toPromise().then((doc) => {
            if (doc.exists) {
              const userData = doc.data() as UserData;
              this.calorias = userData?.tmb || 0;

              // Convertir la fecha de Firestore a formato legible
              const fechaFirestore = userData?.updatedAt?.toDate();
              this.fechaCalculo = fechaFirestore
                ? new Date(fechaFirestore).toLocaleDateString('es-CL', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : null;
            } else {
              console.log('No se encontraron datos para este usuario en Firestore.');
            }
          }).catch((error) => {
            console.error('Error al recuperar datos del usuario:', error);
          });
        } else {
          console.log('No hay usuario autenticado');
          this.uid = null;

          // Limpiar datos si no hay usuario autenticado
          this.calorias = 0;
          this.fechaCalculo = null;
        }
      })
      .catch((error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        this.uid = null;

        // Limpiar datos en caso de error
        this.calorias = 0;
        this.fechaCalculo = null;
      });

    // Recuperar calorías del almacenamiento local
    this.storage.get('tmb').then((calorias) => {
      this.calorias = calorias || 0;
    }).catch((error) => {
      console.error('Error al recuperar calorías:', error);
      this.calorias = 0;
    });
  }

  cancelar() {
    if (this.modalContador) {
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

      this.calorias = Math.floor(this.tmb);

      alert(`Tu TMB es: ${this.tmb.toFixed(0)} kcal/día`);

      if (this.uid) {
        const userDocRef = this.firestore.collection('users').doc(this.uid);

        try {
          const userDoc = await userDocRef.get().toPromise();

          if (userDoc.exists) {
            await userDocRef.update({
              tmb: Math.floor(this.tmb),
              updatedAt: new Date(),
            });
          } else {
            await userDocRef.set({
              tmb: Math.floor(this.tmb),
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }

          console.log('TMB guardado exitosamente en Firestore.');
          this.storage.create();
          this.storage.set('tmb', Math.floor(this.tmb));

          // Actualizar fecha en tiempo real
          this.fechaCalculo = new Date().toLocaleDateString('es-CL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

        } catch (error) {
          console.error('Error al guardar el TMB en Firestore:', error);
        }
      } else {
        alert('No se encontró usuario autenticado. Inicia sesión para guardar tu TMB.');
      }
      this.cancelar();
    }
  }
}
