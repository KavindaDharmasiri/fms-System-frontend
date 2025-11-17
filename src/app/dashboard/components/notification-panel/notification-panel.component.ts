import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService, NotificationMessage } from '../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-panel',
  template: `
    <div class="notification-panel" *ngIf="notifications.length > 0">
      <div class="notification-header">
        <h4>Live Alerts</h4>
        <button class="clear-all-btn" (click)="clearAll()">
          <i class="ph ph-x"></i>
        </button>
      </div>
      <div class="notification-list">
        <div 
          *ngFor="let notification of notifications; trackBy: trackByNotificationId" 
          class="notification-item"
          [ngClass]="'notification-' + notification.type"
        >
          <div class="notification-icon">
            <i class="ph" [ngClass]="getIconClass(notification.type)"></i>
          </div>
          <div class="notification-content">
            <div class="notification-title">{{ notification.title }}</div>
            <div class="notification-message">{{ notification.message }}</div>
            <div class="notification-time">{{ notification.timestamp | date:'short' }}</div>
          </div>
          <button class="close-btn" (click)="removeNotification(notification.id)">
            <i class="ph ph-x"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notification-panel {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 350px;
      max-height: 500px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      overflow: hidden;
    }

    .notification-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #f1f5f9;
      background: #f8fafc;

      h4 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
      }

      .clear-all-btn {
        width: 24px;
        height: 24px;
        border: none;
        background: transparent;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #64748b;

        &:hover {
          background: #e2e8f0;
        }
      }
    }

    .notification-list {
      max-height: 400px;
      overflow-y: auto;
    }

    .notification-item {
      display: flex;
      align-items: flex-start;
      padding: 16px 20px;
      border-bottom: 1px solid #f1f5f9;
      animation: slideIn 0.3s ease-out;

      &:last-child {
        border-bottom: none;
      }

      .notification-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        flex-shrink: 0;
      }

      .notification-content {
        flex: 1;
        min-width: 0;

        .notification-title {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .notification-message {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 4px;
          word-wrap: break-word;
        }

        .notification-time {
          font-size: 12px;
          color: #94a3b8;
        }
      }

      .close-btn {
        width: 20px;
        height: 20px;
        border: none;
        background: transparent;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #94a3b8;
        flex-shrink: 0;

        &:hover {
          background: #f1f5f9;
          color: #64748b;
        }
      }

      &.notification-success {
        .notification-icon {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        .notification-title {
          color: #22c55e;
        }
      }

      &.notification-warning {
        .notification-icon {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }
        .notification-title {
          color: #f59e0b;
        }
      }

      &.notification-error {
        .notification-icon {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
        .notification-title {
          color: #ef4444;
        }
      }

      &.notification-info {
        .notification-icon {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
        .notification-title {
          color: #3b82f6;
        }
      }
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .notification-panel {
        width: calc(100vw - 40px);
        right: 20px;
        left: 20px;
      }
    }
  `]
})
export class NotificationPanelComponent implements OnInit, OnDestroy {
  notifications: NotificationMessage[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.notifications$.subscribe(
      notifications => {
        this.notifications = notifications;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }

  clearAll(): void {
    this.notificationService.clearAllNotifications();
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'success': return 'ph-check-circle';
      case 'warning': return 'ph-warning-circle';
      case 'error': return 'ph-x-circle';
      case 'info': return 'ph-info';
      default: return 'ph-info';
    }
  }

  trackByNotificationId(index: number, notification: NotificationMessage): string {
    return notification.id;
  }
}