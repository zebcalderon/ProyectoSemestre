import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(
    private fireAuth: AngularFireAuth,
    private router:Router,
    private firestore: AngularFirestore,
    private sesion_actual: Storage,
  ) { }
  

  login(email:string, password:string){
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  logout(){
    return this.fireAuth.signOut().then(()=>{
      this.sesion_actual.create();
      this.sesion_actual.set('sesion', 'loggedOut');
      this.router.navigate(['/pre-inicio']);
    });
  }
}
