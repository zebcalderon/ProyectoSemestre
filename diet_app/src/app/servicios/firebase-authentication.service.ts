import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore) { }

  async getProfile(){
    const currentUser = await this.fireAuth.currentUser;
    if (currentUser) {
      // Fetch the user's profile from Firestore using the user's UID
      const userDoc = await this.firestore.collection('users').doc(currentUser.uid).get().toPromise();
      return userDoc.data();
    }
    return null;
  }

  async resetPassword(email:string){
    return await this.fireAuth.sendPasswordResetEmail(email)
  }
}
