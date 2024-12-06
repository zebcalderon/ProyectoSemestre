import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarSesionPageRoutingModule } from './registrar-sesion-routing.module';

import { RegistrarSesionPage } from './registrar-sesion.page';
import { ShareModule } from 'src/app/modulos/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarSesionPageRoutingModule,
    ReactiveFormsModule,
    ShareModule,
  ],
  declarations: [RegistrarSesionPage]
})
export class RegistrarSesionPageModule {}
