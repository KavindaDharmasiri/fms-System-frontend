import { Component, ViewChild, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  public barChart: any = [];
  public donutChart: any = [];

  ngOnInit() {
    this.barChart = new Chart('bar', {
      type: 'bar',
      data: {
        labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
        datasets: [
          {
            data: [65, 59, 80, 81, 56, 55, 40],
            label: 'Series A',
            backgroundColor: '#3B63C8',
          },
          {
            data: [28, 48, 40, 19, 86, 27, 90],
            label: 'Series B',
            backgroundColor: '#DA8F3E',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {},
          y: {
            min: 10,
          },
        },
      },
    });

    this.donutChart = new Chart('donutChart', {
      type: 'doughnut',
      data: {
        labels: ['Lable 01', 'Lable 02', 'Lable 03'],
        datasets: [
          {
            data: [25, 50, 25],
            backgroundColor: ['#DA8F3E', '#3B63C8', '#A0C4F0'],
            hoverBackgroundColor: ['#DA8F3E', '#3B63C8', '#A0C4F0'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  // Pie chart
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Download Sales'], ['In Sales'], 'Mail Sales'],
    datasets: [
      {
        data: [300, 350, 250],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  // Line Chart
  constructor() {
    Chart.register(Annotation);
  }

  public lineChartType: ChartType = 'line';

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [180, 480, 770, 90, 1000, 270, 400],
        label: 'Series C',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold',
              },
            },
          },
        ],
      },
    },
  };


}

