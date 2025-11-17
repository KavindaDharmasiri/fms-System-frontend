import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DashboardStats {
  totalTransactions: number;
  totalTransactionsChange: number;
  blockedTransactions: number;
  blockedTransactionsChange: number;
  fraudRate: number;
  fraudRateChange: number;
  valueAtRisk: number;
  valueAtRiskChange: number;
}

export interface TransactionData {
  id: string;
  timestamp: Date;
  amount: number;
  merchant: string;
  location: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private statsSubject = new BehaviorSubject<DashboardStats>({
    totalTransactions: 0,
    totalTransactionsChange: 0,
    blockedTransactions: 0,
    blockedTransactionsChange: 0,
    fraudRate: 0,
    fraudRateChange: 0,
    valueAtRisk: 0,
    valueAtRiskChange: 0
  });

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.statsSubject.asObservable();
  }

  getRecentTransactions(): Observable<any> {
    return this.http.get(environment.CORE_SERVICE.HIGH_RISK.GET_ALL);
  }

  getFraudRules(): Observable<any> {
    return this.http.get(environment.CORE_SERVICE.RULE.FILTER);
  }

  getTransactionStream(): Observable<any> {
    return new Observable(observer => {
      const eventSource = new EventSource(environment.CORE_SERVICE.HIGH_RISK.GET_ALL_STREAM);
      
      eventSource.onmessage = event => {
        observer.next(JSON.parse(event.data));
      };

      eventSource.onerror = error => {
        observer.error(error);
      };

      return () => eventSource.close();
    });
  }

  updateStats(transactions: any[]): void {
    if (!Array.isArray(transactions)) {
      console.warn('Invalid transactions data:', transactions);
      return;
    }

    const total = transactions.length;
    const blocked = transactions.filter(t => 
      t.status === 'MID' || t.status === 'HIGH'
    ).length;
    
    const fraudRate = total > 0 ? (blocked / total) * 100 : 0;
    
    const valueAtRisk = transactions
      .filter(t => t.status === 'MID' || t.status === 'HIGH')
      .reduce((sum, t) => {
        const amount = t.tranPacket?.amount || t.amount || 0;
        return sum + parseFloat(amount.toString());
      }, 0);

    const prevStats = this.statsSubject.value;
    const totalChange = prevStats.totalTransactions > 0 ? 
      ((total - prevStats.totalTransactions) / prevStats.totalTransactions) * 100 : 
      (total > 0 ? 2.5 : 0);
    
    const blockedChange = prevStats.blockedTransactions > 0 ? 
      ((blocked - prevStats.blockedTransactions) / prevStats.blockedTransactions) * 100 : 
      (blocked > 0 ? -1.2 : 0);

    this.statsSubject.next({
      totalTransactions: total,
      totalTransactionsChange: parseFloat(totalChange.toFixed(1)),
      blockedTransactions: blocked,
      blockedTransactionsChange: parseFloat(blockedChange.toFixed(1)),
      fraudRate: parseFloat(fraudRate.toFixed(2)),
      fraudRateChange: parseFloat((fraudRate - (prevStats.fraudRate || 0)).toFixed(1)),
      valueAtRisk: valueAtRisk,
      valueAtRiskChange: prevStats.valueAtRisk > 0 ? 
        parseFloat(((valueAtRisk - prevStats.valueAtRisk) / prevStats.valueAtRisk * 100).toFixed(1)) : 
        (valueAtRisk > 0 ? -0.8 : 0)
    });
  }
}