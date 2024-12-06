import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/componentes/footer/footer.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ShareModule { }
