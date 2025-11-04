import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  stats = {
    totalTransactions: 1234567,
    totalTransactionsChange: 2.5,
    blockedTransactions: 8912,
    blockedTransactionsChange: -1.2,
    fraudRate: 0.72,
    fraudRateChange: 0.1,
    valueAtRisk: 45821,
    valueAtRiskChange: -0.8
  };

  fraudRules = [
    { name: 'High-Value International', triggers: 1204, active: true },
    { name: 'Unusual Merchant Category', triggers: 856, active: true },
    { name: 'Rapid Repeat Transactions', triggers: 431, active: true },
    { name: 'Transaction After Midnight', triggers: 210, active: false }
  ];

  recentTransactions = [
    {
      id: 'tx_1a2b3c4d5e6f',
      timestamp: new Date('2023-10-27T14:35:12'),
      amount: 1250.00,
      merchant: 'Apple Inc.',
      location: 'Cupertino, USA',
      status: 'Blocked'
    },
    {
      id: 'tx_7g8h9i0j1k2l',
      timestamp: new Date('2023-10-27T14:34:58'),
      amount: 89.99,
      merchant: 'Amazon',
      location: 'London, UK',
      status: 'Approved'
    },
    {
      id: 'tx_3m4n5o6p7q8r',
      timestamp: new Date('2023-10-27T14:34:45'),
      amount: 25.50,
      merchant: 'Starbucks',
      location: 'Seattle, USA',
      status: 'Approved'
    },
    {
      id: 'tx_9s0t1u2v3w4x',
      timestamp: new Date('2023-10-27T14:33:30'),
      amount: 420.00,
      merchant: 'Ebay',
      location: 'Moscow, RU',
      status: 'Flagged'
    }
  ];

  toggleRule(rule: any) {
    rule.active = !rule.active;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Approved': return 'status-approved';
      case 'Blocked': return 'status-blocked';
      case 'Flagged': return 'status-flagged';
      default: return 'status-blocked';
    }
  }
}
