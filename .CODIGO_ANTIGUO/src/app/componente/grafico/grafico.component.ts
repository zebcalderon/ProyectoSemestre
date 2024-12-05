import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexStroke, ApexTooltip, ApexXAxis } from 'ng-apexcharts/public_api';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss'],
})
export class GraficoComponent  implements OnInit {
  chartOptions : ChartOptions;

  constructor() { 
    this.chartOptions = {
      series: [
        {
          name: "Calorias recomendadas",
          data: [1800,1850,1890,2000]
        },
        {
          name: "Calorias consumidas",
          data: [2000,1900,1950,2100]
        }
      ],
      chart: {
        height: 500,
        type: "area",
        width: 400,
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19",
          "2018-09-20",
          "2018-09-21",
          "2018-09-22",
          "2018-09-23",
          "2018-09-24",
          "2018-09-25"
        ]
      },
      tooltip: {
        x: {
          
        }
      }
    };
  }

  ngOnInit() {}

}
