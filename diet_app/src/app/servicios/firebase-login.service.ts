import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(
    private fireAuth: AngularFireAuth,
    private router:Router,
    private firestore: AngularFirestore,
  ) { }
  

  login(email:string, password:string){
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  logout(){
    return this.fireAuth.signOut().then(()=>{
      this.router.navigate(['/pre-login']);
    });
  }
}
