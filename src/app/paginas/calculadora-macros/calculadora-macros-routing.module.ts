import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculadoraMacrosPage } from './calculadora-macros.page';

const routes: Routes = [
  {
    path: '',
    component: CalculadoraMacrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculadoraMacrosPageRoutingModule {}
