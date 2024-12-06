import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild('modalContador', { static: true }) modalContador!: IonModal;
  edad: number | null = null;
  altura: number | null = null;
  peso: number | null = null;
  sexo: string = '';
  ejercicio: string = '';
  tmb: number | null = null;

  constructor(
    private animationCtrl:AnimationController
  ) { }

  ngOnInit() {
    const enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;
      if (!root) {
        console.error('No se encontró');
        return this.animationCtrl.create();
      }
      const backdrop = root.querySelector('ion-backdrop');
      const wrapper = root.querySelector('.modal-wrapper');

      if(!backdrop || !wrapper){
        console.error('No se encontraron los elementos');
        return this.animationCtrl.create();
      }

      const backdropAnimation = this.animationCtrl
      .create()
      .addElement(backdrop)
      .fromTo('opacity', '0.91', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(wrapper)
      .keyframes([
        { offset: 0, opacity: '0',    transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' }
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
      this.modalContador
    ];

    modals.forEach(modal => {
      modal.enterAnimation = enterAnimation;
      modal.leaveAnimation = leaveAnimation;
    });
  }

  cancelar(){
   if(this.modalContador){
     this.modalContador.dismiss(null, 'cancelar');
   }
  }

  calcularTMB(){
    const peso = this.peso ?? 0;
    const altura = this.altura ?? 0;
    const edad = this.edad ?? 0;

    if (peso === 0 || altura === 0 || edad === 0 || !this.sexo || !this.ejercicio) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }
    if (this.sexo === 'Hombre') {
      this.tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
    } else if (this.sexo === 'Mujer') {
      this.tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
    } 

    if (this.tmb !== null) {
      switch (this.ejercicio) {
        case 'ligera':
          this.tmb *= 1.375;
          break;
        case 'moderada':
          this.tmb *= 1.55;
          break;
        case 'intensa' :
          this.tmb *= 1.725;
          break;
        case 'nada' : 
          break;
        default:
          break;
      }
      alert(`Tu TMB es: ${this.tmb.toFixed(2)} kcal/día`)
    }
  }
}
