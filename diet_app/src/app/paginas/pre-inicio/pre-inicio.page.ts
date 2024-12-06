import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-pre-inicio',
  templateUrl: './pre-inicio.page.html',
  styleUrls: ['./pre-inicio.page.scss'],
})
export class PreInicioPage implements OnInit {

  constructor(
    private sesion_invitado: Storage,
    private router:Router,
    private loadingController:LoadingController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.sesion_invitado.create();
    await this.sesion_invitado.get('invitado').then((val: string) => {
      if(val == null || val == 'true'){
        this.sesion_invitado.set('invitado', 'loggedOut');
        loading.dismiss();
      } else if(val == 'loggedOut'){
        loading.dismiss();
      } else {
        loading.dismiss();
        this.router.navigate(['/inicio']);
      }
    });
    
  }

  iniciar_invitado(){
    this.sesion_invitado.set('invitado', 'true');
    this.router.navigate(['/inicio']);
  }

}
