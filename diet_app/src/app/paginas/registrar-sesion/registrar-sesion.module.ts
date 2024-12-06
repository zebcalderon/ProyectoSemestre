import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarSesionPageRoutingModule } from './registrar-sesion-routing.module';

import { RegistrarSesionPage } from './registrar-sesion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarSesionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrarSesionPage]
})
export class RegistrarSesionPageModule {}
