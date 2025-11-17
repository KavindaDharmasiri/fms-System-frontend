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
      .pipe(catchError(() => of([])))
      .subscribe({
        next: (notifications) => {
          this.notifications = notifications;
          this.unreadCount = notifications.filter(n => n.status === 'UNREAD').length;
        },
        error: () => {
          this.notifications = [];
          this.unreadCount = 0;
        }
      });
  }

  markAsRead(notificationId: number) {
    this.http.put(`/api/v1/notifications/${notificationId}/read`, {})
      .pipe(catchError(() => of(null)))
      .subscribe(() => {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification && notification.status === 'UNREAD') {
          notification.status = 'read';
          this.unreadCount--;
        }
      });
  }
}
