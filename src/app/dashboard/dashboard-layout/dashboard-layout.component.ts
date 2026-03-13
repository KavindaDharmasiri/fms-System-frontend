import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService, DashboardStats } from '../services/dashboard.service';
import { NotificationService } from '../services/notification.service';
import { Subscription, interval } from 'rxjs';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  stats: DashboardStats = {
    totalTransactions: 0,
    totalTransactionsChange: 0,
    blockedTransactions: 0,
    blockedTransactionsChange: 0,
    fraudRate: 0,
    fraudRateChange: 0,
    valueAtRisk: 0,
    valueAtRiskChange: 0
  };

  // Enhanced dashboard metrics
  realTimeMetrics = {
    transactionsPerSecond: 0,
    transactionsPerMinute: 0,
    activeTransactions: 0,
    averageProcessingTime: 0,
    systemHealth: 'Healthy',
    lastUpdated: new Date()
  };

  fraudAnalytics = {
    detectionRate: 0,
    falsePositiveRate: 0,
    truePositiveRate: 0,
    totalFraudAmount: 0,
    avgFraudAmount: 0
  };

  rulePerformance = {
    totalActiveRules: 0,
    topPerformingRules: [] as Array<{name: string, effectiveness: number, fireCount: number}>,
    underPerformingRules: [] as Array<{name: string, effectiveness: number, fireCount: number}>,
    overallEfficiency: 0
  };

  systemAlerts: any[] = [];
  fraudRules: any[] = [];
  recentTransactions: any[] = [];
  
  // Chart configurations
  transactionVolumeChart: ChartConfiguration | null = null;
  fraudTrendChart: ChartConfiguration | null = null;
  riskDistributionChart: ChartConfiguration | null = null;
  
  private subscriptions: Subscription[] = [];
  loading = true;
  selectedTimeRange = '24h';
  
  // Dashboard view options
  viewMode = 'overview'; // overview, analytics, monitoring
  refreshInterval = 30000; // 30 seconds

  constructor(
    private dashboardService: DashboardService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.subscribeToStats();
    this.subscribeToTransactionStream();
    this.setupRealTimeUpdates();
    this.initializeCharts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private setupRealTimeUpdates(): void {
    // Update real-time metrics every 5 seconds
    const realTimeUpdate = interval(5000).subscribe(() => {
      this.updateRealTimeMetrics();
    });
    this.subscriptions.push(realTimeUpdate);

    // Refresh dashboard data based on selected interval
    const dashboardRefresh = interval(this.refreshInterval).subscribe(() => {
      this.refreshDashboardData();
    });
    this.subscriptions.push(dashboardRefresh);
  }

  private updateRealTimeMetrics(): void {
    // Simulate real-time metrics (in production, this would come from API)
    this.realTimeMetrics = {
      transactionsPerSecond: Math.floor(Math.random() * 50) + 10,
      transactionsPerMinute: Math.floor(Math.random() * 3000) + 500,
      activeTransactions: Math.floor(Math.random() * 100) + 20,
      averageProcessingTime: Math.random() * 200 + 50,
      systemHealth: Math.random() > 0.1 ? 'Healthy' : 'Warning',
      lastUpdated: new Date()
    };
  }

  private refreshDashboardData(): void {
    // Refresh fraud analytics
    this.loadFraudAnalytics();
    // Refresh rule performance
    this.loadRulePerformance();
    // Update charts
    this.updateCharts();
  }

  private loadFraudAnalytics(): void {
    // Simulate fraud analytics data
    this.fraudAnalytics = {
      detectionRate: Math.random() * 20 + 80, // 80-100%
      falsePositiveRate: Math.random() * 15 + 5, // 5-20%
      truePositiveRate: Math.random() * 10 + 85, // 85-95%
      totalFraudAmount: Math.random() * 1000000 + 500000,
      avgFraudAmount: Math.random() * 5000 + 1000
    };
  }

  private loadRulePerformance(): void {
    this.rulePerformance = {
      totalActiveRules: Math.floor(Math.random() * 50) + 20,
      topPerformingRules: [
        { name: 'Velocity Rule', effectiveness: 92.5, fireCount: 150 },
        { name: 'Geographic Risk', effectiveness: 88.7, fireCount: 89 },
        { name: 'Amount Threshold', effectiveness: 85.2, fireCount: 67 }
      ],
      underPerformingRules: [
        { name: 'Time-based Rule', effectiveness: 65.3, fireCount: 23 },
        { name: 'Merchant Category', effectiveness: 58.9, fireCount: 12 }
      ],
      overallEfficiency: Math.random() * 20 + 75 // 75-95%
    };
  }

  private initializeCharts(): void {
    this.setupTransactionVolumeChart();
    this.setupFraudTrendChart();
    this.setupRiskDistributionChart();
  }

  private setupTransactionVolumeChart(): void {
    const hours = Array.from({length: 24}, (_, i) => `${i}:00`);
    const data = hours.map(() => Math.floor(Math.random() * 1000) + 200);

    this.transactionVolumeChart = {
      type: 'line' as ChartType,
      data: {
        labels: hours,
        datasets: [{
          label: 'Transaction Volume',
          data: data,
          borderColor: '#1976d2',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    };
  }

  private setupFraudTrendChart(): void {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const fraudData = days.map(() => Math.floor(Math.random() * 50) + 10);
    const totalData = days.map(() => Math.floor(Math.random() * 1000) + 500);

    this.fraudTrendChart = {
      type: 'bar' as ChartType,
      data: {
        labels: days,
        datasets: [
          {
            label: 'Fraud Detected',
            data: fraudData,
            backgroundColor: '#f44336',
            borderRadius: 4
          },
          {
            label: 'Total Transactions',
            data: totalData,
            backgroundColor: '#4caf50',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
  }

  private setupRiskDistributionChart(): void {
    this.riskDistributionChart = {
      type: 'doughnut' as ChartType,
      data: {
        labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk'],
        datasets: [{
          data: [45, 30, 20, 5],
          backgroundColor: [
            '#4caf50',
            '#ff9800',
            '#f44336',
            '#9c27b0'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    };
  }

  private updateCharts(): void {
    // Update chart data with new values
    if (this.transactionVolumeChart?.data?.datasets?.[0]) {
      const newData = Array.from({length: 24}, () => Math.floor(Math.random() * 1000) + 200);
      this.transactionVolumeChart.data.datasets[0].data = newData;
    }
  }

  // Existing methods with enhancements
  private loadDashboardData(): void {
    const transactionSub = this.dashboardService.getRecentTransactions().subscribe({
      next: (response) => {
        console.log('Transaction response:', response);
        let transactions = [];
        
        if (response?.success && response?.data) {
          transactions = Array.isArray(response.data) ? response.data : response.data.content || [];
        } else if (Array.isArray(response)) {
          transactions = response;
        }
        
        this.recentTransactions = transactions.slice(0, 10);
        this.dashboardService.updateStats(transactions);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        this.loading = false;
      }
    });
    this.subscriptions.push(transactionSub);

    const rulesSub = this.dashboardService.getFraudRules().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.fraudRules = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading rules:', error);
      }
    });
    this.subscriptions.push(rulesSub);

    // Load additional analytics
    this.loadFraudAnalytics();
    this.loadRulePerformance();
  }

  private subscribeToStats(): void {
    const statsSub = this.dashboardService.getDashboardStats().subscribe(stats => {
      this.stats = stats;
    });
    this.subscriptions.push(statsSub);
  }

  private subscribeToTransactionStream(): void {
    const streamSub = this.dashboardService.getTransactionStream().subscribe({
      next: (transaction) => {
        transaction.isNew = true;
        this.recentTransactions.unshift(transaction);
        if (this.recentTransactions.length > 10) {
          this.recentTransactions.pop();
        }
        this.dashboardService.updateStats(this.recentTransactions);
        this.notificationService.showTransactionAlert(transaction);
        
        // Remove new flag after animation
        setTimeout(() => {
          transaction.isNew = false;
        }, 2000);
      },
      error: (error) => {
        console.error('Transaction stream error:', error);
        this.notificationService.addNotification({
          type: 'error',
          title: 'Connection Error',
          message: 'Lost connection to transaction stream'
        });
      }
    });
    this.subscriptions.push(streamSub);
  }

  // Enhanced UI methods
  changeTimeRange(range: string): void {
    this.selectedTimeRange = range;
    this.refreshDashboardData();
  }

  changeViewMode(mode: string): void {
    this.viewMode = mode;
  }

  toggleRule(rule: any): void {
    rule.active = !rule.active;
    this.notificationService.addNotification({
      type: 'info',
      title: 'Rule Updated',
      message: `${rule.name} has been ${rule.active ? 'enabled' : 'disabled'}`
    });
  }

  refreshData(): void {
    this.loading = true;
    this.loadDashboardData();
    this.notificationService.addNotification({
      type: 'success',
      title: 'Data Refreshed',
      message: 'Dashboard data has been updated'
    });
  }

  // Utility methods
  getStatusClass(status: string): string {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'approved': 
      case 'success': return 'status-approved';
      case 'blocked': 
      case 'rejected': return 'status-blocked';
      case 'flagged': 
      case 'pending': return 'status-flagged';
      default: return 'status-blocked';
    }
  }

  getHealthStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'healthy': return 'health-good';
      case 'warning': return 'health-warning';
      case 'critical': return 'health-critical';
      default: return 'health-good';
    }
  }

  formatTransactionId(id: string): string {
    return id?.length > 12 ? id.substring(0, 12) + '...' : id;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }

  getTransactionAmount(transaction: any): number {
    return transaction.tranPacket?.amount || transaction.amount || 0;
  }

  getTransactionMerchant(transaction: any): string {
    return transaction.tranPacket?.merchantName || transaction.merchant || 'Unknown';
  }

  getTransactionLocation(transaction: any): string {
    return transaction.tranPacket?.location || transaction.location || 'Unknown';
  }

  trackByTransactionId(index: number, transaction: any): string {
    return transaction.tranUuid || transaction.id || index.toString();
  }

  exportReport(): void {
    this.notificationService.addNotification({
      type: 'info',
      title: 'Export Started',
      message: 'Generating comprehensive dashboard report...'
    });
    
    // Simulate export process
    setTimeout(() => {
      this.notificationService.addNotification({
        type: 'success',
        title: 'Export Complete',
        message: 'Dashboard report has been downloaded'
      });
    }, 2000);
  }

  createNewRule(): void {
    this.notificationService.addNotification({
      type: 'info',
      title: 'Rule Creation',
      message: 'Redirecting to rule configuration...'
    });
  }

  viewTransactionDetails(transaction: any): void {
    // Navigate to transaction details
    console.log('Viewing transaction details:', transaction);
  }

  acknowledgeAlert(alert: any): void {
    alert.acknowledged = true;
    this.notificationService.addNotification({
      type: 'success',
      title: 'Alert Acknowledged',
      message: 'Alert has been marked as acknowledged'
    });
  }
}
