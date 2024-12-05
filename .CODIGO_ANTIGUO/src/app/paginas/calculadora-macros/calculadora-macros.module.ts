import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculadoraMacrosPageRoutingModule } from './calculadora-macros-routing.module';

import { CalculadoraMacrosPage } from './calculadora-macros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculadoraMacrosPageRoutingModule
  ],
  declarations: [CalculadoraMacrosPage]
})
export class CalculadoraMacrosPageModule {}
