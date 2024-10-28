import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

}
