import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreInicioPage } from './pre-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: PreInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreInicioPageRoutingModule {}
