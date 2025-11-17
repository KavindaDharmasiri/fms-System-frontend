import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NotificationMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  autoClose?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<NotificationMessage[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  addNotification(notification: Omit<NotificationMessage, 'id' | 'timestamp'>): void {
    const newNotification: NotificationMessage = {
      ...notification,
      id: this.generateId(),
      timestamp: new Date(),
      autoClose: notification.autoClose !== false
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([newNotification, ...currentNotifications]);

    if (newNotification.autoClose) {
      setTimeout(() => {
        this.removeNotification(newNotification.id);
      }, 5000);
    }
  }

  removeNotification(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(filteredNotifications);
  }

  clearAllNotifications(): void {
    this.notificationsSubject.next([]);
  }

  showTransactionAlert(transaction: any): void {
    if (transaction.status === 'HIGH') {
      this.addNotification({
        type: 'error',
        title: 'High Risk Transaction',
        message: `High-risk transaction detected: $${transaction.tranPacket?.amount || 0}`,
        autoClose: true
      });
    } else if (transaction.status === 'MID') {
      this.addNotification({
        type: 'warning',
        title: 'Medium Risk Transaction',
        message: `Transaction requires review: ${transaction.tranUuid}`,
        autoClose: true
      });
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}