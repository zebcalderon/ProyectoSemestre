import { Component, OnInit, ViewChild} from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  cancelar(){
    this.modal.dismiss(null, 'cancelar');
  }


  constructor() { }

  ngOnInit() {
  }


}

