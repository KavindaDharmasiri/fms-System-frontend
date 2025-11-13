import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  healthStatus: any = {};
  metrics: any = {};
  loading = true;
  currentDate = new Date();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHealthStatus();
    this.loadMetrics();
    
    // Refresh every 30 seconds
    interval(30000).subscribe(() => {
      this.loadHealthStatus();
      this.loadMetrics();
      this.currentDate = new Date();
    });
  }

  loadHealthStatus(): void {
    this.http.get('/fms-core-service/api/v1/health').subscribe({
      next: (data) => {
        this.healthStatus = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load health status:', err);
        // Fallback to actuator endpoint
        this.http.get('/fms-core-service/actuator/health').subscribe({
          next: (data) => {
            this.healthStatus = data;
            this.loading = false;
          },
          error: (err2) => {
            console.error('Actuator endpoint also failed:', err2);
            this.healthStatus = { status: 'DOWN', error: 'Service unavailable' };
            this.loading = false;
          }
        });
      }
    });
  }

  loadMetrics(): void {
    this.http.get('/fms-core-service/actuator/metrics').subscribe({
      next: (data) => {
        this.metrics = data;
      },
      error: (err) => {
        console.error('Failed to load metrics:', err);
        this.metrics = { names: ['Service unavailable'] };
      }
    });
  }

  getHealthStatusClass(status: any): string {
    return status === 'UP' ? 'text-success' : 'text-danger';
  }

  getHealthIcon(status: any): string {
    return status === 'UP' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
  }

  getComponentValue(component: any): any {
    return component?.value || {};
  }

  loadMetricDetails(metricName: string): void {
    this.http.get(`/fms-core-service/actuator/metrics/${metricName}`).subscribe({
      next: (data) => {
        console.log(`Metric ${metricName}:`, data);
        alert(`Metric: ${metricName}\nValue: ${JSON.stringify(data, null, 2)}`);
      },
      error: (err) => console.error(`Failed to load metric ${metricName}:`, err)
    });
  }
}