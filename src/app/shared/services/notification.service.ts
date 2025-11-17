import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import SockJS from 'sockjs-client';
import { Stomp, CompatClient } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private stompClient: CompatClient | null = null;
  private notificationSubject = new BehaviorSubject<any>(null);
  public notifications$ = this.notificationSubject.asObservable();

  constructor() {
    this.connect();
  }

  connect() {
    const socket = new SockJS('http://localhost:8087/ws');
    this.stompClient = Stomp.over(socket);
    
    this.stompClient.connect({}, () => {
      console.log('Connected to notification service');
      
      this.stompClient?.subscribe('/topic/notifications', (message: any) => {
        const notification = JSON.parse(message.body);
        this.notificationSubject.next(notification);
        this.showNotification(notification);
      });
      
      this.stompClient?.subscribe('/topic/risk-high', (message: any) => {
        const notification = JSON.parse(message.body);
        this.showCriticalAlert(notification);
      });
      
      this.stompClient?.subscribe('/topic/risk-medium', (message: any) => {
        const notification = JSON.parse(message.body);
        this.showWarningAlert(notification);
      });
    });
  }

  private showNotification(notification: any) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `alert alert-${this.getAlertClass(notification.riskLevel)} alert-dismissible fade show position-fixed`;
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.zIndex = '9999';
    toast.innerHTML = `
      <strong>${notification.riskLevel} Risk Alert!</strong><br>
      Transaction: ${notification.transactionId}<br>
      Amount: ${notification.amount}<br>
      Risk Score: ${notification.riskScore}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 5000);
  }

  private showCriticalAlert(notification: any) {
    alert(`🚨 CRITICAL: High Risk Transaction Detected!\nID: ${notification.transactionId}\nRisk Score: ${notification.riskScore}`);
  }

  private showWarningAlert(notification: any) {
    console.warn('Medium Risk Transaction:', notification);
  }

  private getAlertClass(riskLevel: string): string {
    switch (riskLevel) {
      case 'HIGH': return 'danger';
      case 'MEDIUM': return 'warning';
      default: return 'info';
    }
  }
}