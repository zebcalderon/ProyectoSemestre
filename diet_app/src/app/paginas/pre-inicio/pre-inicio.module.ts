import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreInicioPageRoutingModule } from './pre-inicio-routing.module';

import { PreInicioPage } from './pre-inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreInicioPageRoutingModule
  ],
  declarations: [PreInicioPage]
})
export class PreInicioPageModule {}
