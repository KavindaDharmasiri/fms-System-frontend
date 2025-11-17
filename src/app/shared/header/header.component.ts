import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  pageTitle: string = 'Page Title';
  notifications: any[] = [];
  unreadCount = 0;
  private notificationSubscription?: Subscription;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const child = this.getChild(this.activatedRoute);
        child.data.subscribe(data => {
          this.pageTitle = data['title'] || 'Page Title';
        });
      });
  }

  getChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }


  getUserName(): string {
    const userDetails = sessionStorage.getItem('user_details');
    if (userDetails) {
      try {
        return JSON.parse(userDetails).username || 'User';
      } catch {
        return 'User';
      }
    }
    return 'User';
  }

  getUserInitials(): string {
    const name = this.getUserName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  ngOnInit() {
    this.loadNotifications();
    // Auto-refresh every 10 seconds
    setInterval(() => {
      this.loadNotifications();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  loadNotifications() {
    const userId = this.getUserName();
    this.http.get<any[]>(`/api/v1/notifications/user/${userId}`)
      .pipe(catchError(() => of(this.getMockNotifications())))
      .subscribe({
        next: (notifications) => {
          this.notifications = notifications;
          this.unreadCount = notifications.filter(n => n.status === 'UNREAD').length;
        },
        error: () => {
          this.notifications = this.getMockNotifications();
          this.unreadCount = this.notifications.filter(n => n.status === 'UNREAD').length;
        }
      });
  }

  getMockNotifications() {
    return [
      {
        id: 1,
        title: 'High-Risk Transaction Detected',
        message: 'Suspicious transaction of $2,500 from unusual location',
        type: 'FRAUD_ALERT',
        status: 'UNREAD',
        createdAt: new Date(Date.now() - 5 * 60000) // 5 minutes ago
      },
      {
        id: 2,
        title: 'System Maintenance Complete',
        message: 'Fraud detection system has been updated successfully',
        type: 'SYSTEM_ALERT',
        status: 'UNREAD',
        createdAt: new Date(Date.now() - 30 * 60000) // 30 minutes ago
      },
      {
        id: 3,
        title: 'New Rule Activated',
        message: 'International transaction monitoring rule is now active',
        type: 'INFO',
        status: 'read',
        createdAt: new Date(Date.now() - 2 * 60 * 60000) // 2 hours ago
      }
    ];
  }

  markAsRead(notificationId: number) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (!notification || notification.status === 'read') return;

    // Optimistic update with loading state
    notification.markingRead = true;
    
    this.http.put(`/api/v1/notifications/${notificationId}/read`, {})
      .pipe(catchError(() => of(null)))
      .subscribe({
        next: () => {
          notification.status = 'read';
          notification.markingRead = false;
          this.unreadCount = Math.max(0, this.unreadCount - 1);
        },
        error: () => {
          notification.markingRead = false;
        }
      });
  }

  onNotificationClick(notification: any) {
    // Mark as read when clicked
    if (notification.status === 'UNREAD') {
      this.markAsRead(notification.id);
    }
    
    // Show notification popup
    this.showNotificationPopup(notification);
  }

  showNotificationPopup(notification: any) {
    const popup = document.createElement('div');
    popup.className = 'notification-popup';
    popup.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      z-index: 99999 !important;
      background: rgba(0, 0, 0, 0) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: background 0.3s ease !important;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow: auto;
      transform: scale(0.8) translateY(20px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;
    
    content.innerHTML = `
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #e2e8f0;
      ">
        <h5 style="margin: 0; color: #1f2937; font-weight: 600;">${notification.title}</h5>
        <button class="popup-close" style="
          width: 32px;
          height: 32px;
          border: none;
          background: #f1f5f9;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        ">
          <i class="ph ph-x"></i>
        </button>
      </div>
      <div style="padding: 20px;">
        <p style="color: #374151; line-height: 1.5; margin-bottom: 16px;">${notification.message}</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            background: #dbeafe;
            color: #1e40af;
          ">${notification.type.replace('_', ' ')}</span>
          <span style="font-size: 12px; color: #6b7280;">${new Date(notification.createdAt).toLocaleString()}</span>
        </div>
      </div>
    `;
    
    popup.appendChild(content);
    
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        this.closePopup(popup);
      }
    });
    
    content.querySelector('.popup-close')?.addEventListener('click', () => {
      this.closePopup(popup);
    });
    
    document.body.appendChild(popup);
    
    // Trigger animations
    setTimeout(() => {
      popup.style.background = 'rgba(0, 0, 0, 0.5)';
      content.style.transform = 'scale(1) translateY(0)';
      content.style.opacity = '1';
    }, 10);
  }
  
  closePopup(popup: HTMLElement) {
    const content = popup.querySelector('div') as HTMLElement;
    popup.style.background = 'rgba(0, 0, 0, 0)';
    if (content) {
      content.style.transform = 'scale(0.8) translateY(20px)';
      content.style.opacity = '0';
    }
    setTimeout(() => popup.remove(), 300);
  }

  handleNotificationAction(notification: any) {
    // Add your navigation logic here based on notification type
    switch (notification.type) {
      case 'FRAUD_ALERT':
        // Navigate to fraud details
        console.log('Navigate to fraud alert:', notification);
        break;
      case 'SYSTEM_ALERT':
        // Navigate to system settings
        console.log('Navigate to system alert:', notification);
        break;
      default:
        console.log('Handle notification:', notification);
    }
  }

  trackNotification(index: number, notification: any): any {
    return notification.id;
  }
}
