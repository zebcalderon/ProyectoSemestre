import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  @ViewChild('modalContador', { static: true }) modalContador!: IonModal;
  @ViewChild('modalCalorias', { static: true }) modalCalorias!: IonModal;
  @ViewChild('modalEntrenamientos', { static: true }) modalEntrenamientos!: IonModal;
  @ViewChild('modalPasos', { static: true }) modalPasos!: IonModal;
  @ViewChild('modalKm', { static: true }) modalKm!: IonModal;

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
    const enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;
      if (!root) {
        console.error('No se encontró');
        return this.animationCtrl.create();
      }

      const backdrop = root.querySelector('ion-backdrop');
      const wrapper = root.querySelector('.modal-wrapper');
      
      if (!backdrop || !wrapper) {
        console.error('No se encontraron los elementos');
        return this.animationCtrl.create();
      }

      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(backdrop)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(wrapper)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: HTMLElement) => {
      return enterAnimation(baseEl).direction('reverse');
    };

    const modals = [
      this.modalContador,
      this.modalCalorias,
      this.modalEntrenamientos,
      this.modalPasos,
      this.modalKm
    ];

    modals.forEach(modal => {
      modal.enterAnimation = enterAnimation;
      modal.leaveAnimation = leaveAnimation;
    });
  }

  cancelar() {
    if (this.modalContador) {
      this.modalContador.dismiss(null, 'cancelar');
    }
    if (this.modalCalorias) {
      this.modalCalorias.dismiss(null, 'cancelar');
    }
    if (this.modalEntrenamientos) {
      this.modalEntrenamientos.dismiss(null, 'cancelar');
    }
    if (this.modalPasos) {
      this.modalPasos.dismiss(null, 'cancelar');
    }
    if (this.modalKm) {
      this.modalKm.dismiss(null, 'cancelar');
    }
  }



}