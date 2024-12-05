import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public ngFireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  async registerUser(email: string, password: string, nombre: string){
    try {
      const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);

      // After user is created, save additional data (like username) in Firestore
      if (userCredential.user) {
        await this.firestore.collection('users').doc(userCredential.user.uid).set({
          uid: userCredential.user.uid,
          email: email,
          nombre: nombre, // save the username
          createdAt: new Date()
        });
      }

      return userCredential;
    } catch (error) {
      console.error("Error registering user: ", error);
      throw error;
    }
  }

  async loginUser(email:string, password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  async signOut(){
    return await this.ngFireAuth.signOut()
  }

  async getProfile(){
    const currentUser = await this.ngFireAuth.currentUser;
    if (currentUser) {
      // Fetch the user's profile from Firestore using the user's UID
      const userDoc = await this.firestore.collection('users').doc(currentUser.uid).get().toPromise();
      return userDoc.data();
    }
    return null;
  }
}
