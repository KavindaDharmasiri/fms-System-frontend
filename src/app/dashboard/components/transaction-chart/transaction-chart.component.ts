import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-transaction-chart',
  template: `
    <div class="chart-container">
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [`
    .chart-container {
      position: relative;
      height: 300px;
      width: 100%;
    }
  `]
})
export class TransactionChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private chart: Chart | null = null;
  private subscription: Subscription = new Subscription();
  
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.initChart();
    this.subscribeToData();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.subscription.unsubscribe();
  }

  private initChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line' as ChartType,
      data: {
        labels: this.generateTimeLabels(),
        datasets: [
          {
            label: 'Total Transactions',
            data: new Array(24).fill(0),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Blocked Transactions',
            data: new Array(24).fill(0),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  private subscribeToData(): void {
    this.subscription = this.dashboardService.getDashboardStats().subscribe(stats => {
      this.updateChart(stats);
    });
  }

  private updateChart(stats: any): void {
    if (!this.chart) return;

    const currentTime = new Date().getHours();
    const currentData = this.chart.data.datasets[0].data as number[];
    
    // Shift data and add new values
    currentData.push(stats.totalTransactions);
    if (currentData.length > 24) currentData.shift();
    
    const blockedData = this.chart.data.datasets[1].data as number[];
    blockedData.push(stats.blockedTransactions);
    if (blockedData.length > 24) blockedData.shift();
    
    this.chart.update('none');
  }

  private generateTimeLabels(): string[] {
    const labels = [];
    for (let i = 0; i < 24; i++) {
      labels.push(`${i.toString().padStart(2, '0')}:00`);
    }
    return labels;
  }

  private generateRandomData(count: number, multiplier: number = 1): number[] {
    // Use actual data if available, otherwise generate realistic baseline
    const currentStats = this.dashboardService.getDashboardStats();
    return Array.from({ length: count }, (_, i) => {
      const baseValue = 100 + (i * 10); // Realistic baseline
      const variance = Math.random() * 50 - 25; // ±25 variance
      return Math.max(0, Math.floor((baseValue + variance) * multiplier));
    });
  }
}