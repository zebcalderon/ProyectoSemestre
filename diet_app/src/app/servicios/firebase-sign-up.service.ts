import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseSignUpService {
  email: string = '';
  password: string = '';
  user: string = '';

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }

  async registerUser(email: string, password: string, user: string){
    try {
      const userCredential = await this.fireAuth.createUserWithEmailAndPassword(email, password);

      // After user is created, save additional data (like username) in Firestore
      if (userCredential.user) {
        await this.firestore.collection('usuarios').doc(userCredential.user.uid).set({
          uid: userCredential.user.uid,
          email: email,
          username: user,
        });
      }

      return userCredential;
    } catch (error) {
      console.error("Error registering user: ", error);
      throw error;
    }
  }
}
