import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraComponent } from 'src/app/componente/barra/barra.component';
import { IonicModule } from '@ionic/angular';
import { GraficoComponent } from 'src/app/componente/grafico/grafico.component';
import { NgApexchartsModule } from "ng-apexcharts";



@NgModule({
  declarations: [BarraComponent,
    GraficoComponent
  ],
  exports:[BarraComponent,
    GraficoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgApexchartsModule
  ]
})
export class ShareModule { }
