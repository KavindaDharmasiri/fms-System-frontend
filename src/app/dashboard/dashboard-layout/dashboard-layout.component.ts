import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService, DashboardStats } from '../services/dashboard.service';
import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';

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

  fraudRules: any[] = [];

  recentTransactions: any[] = [];
  private subscriptions: Subscription[] = [];
  loading = true;

  constructor(
    private dashboardService: DashboardService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.subscribeToStats();
    this.subscribeToTransactionStream();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

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

  toggleRule(rule: any): void {
    rule.active = !rule.active;
  }

  refreshData(): void {
    this.loading = true;
    this.loadDashboardData();
  }

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

  formatTransactionId(id: string): string {
    return id?.length > 12 ? id.substring(0, 12) + '...' : id;
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
      message: 'Generating dashboard report...'
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
}
