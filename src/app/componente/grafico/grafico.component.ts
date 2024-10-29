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
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Calorias consumidas",
          data: [11, 32, 45, 32, 34, 52, 41]
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
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

  ngOnInit() {}

}
