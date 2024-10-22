import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraComponent } from 'src/app/componente/barra/barra.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [BarraComponent],
  exports:[BarraComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ShareModule { }
