import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShareModule } from './modulos/share/share.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'md',
    }), 
    AppRoutingModule, 
    IonicStorageModule.forRoot(),
    ShareModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot([]),
    FormsModule,
    AngularFireStorageModule,
  ],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy 
  }],
  bootstrap: [AppComponent],
})

export class AppModule {}
