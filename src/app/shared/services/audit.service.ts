import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private baseUrl = '/fms-core-service/api/v1/audit';

  constructor(private http: HttpClient) {}

  getAuditLogs(page: number = 0, size: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/logs?page=${page}&size=${size}`);
  }

  getAuditLogsByUser(userId: string, page: number = 0, size: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/logs/user/${userId}?page=${page}&size=${size}`);
  }

  getAuditLogsByDateRange(startDate: string, endDate: string, page: number = 0, size: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/logs/date-range?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`);
  }

  logUserAction(action: string, entityType: string, entityId?: string, details?: any): void {
    const currentUser = sessionStorage.getItem('user_details');
    const userDetails = currentUser ? JSON.parse(currentUser) : null;
    
    const auditData = {
      action,
      entityType,
      entityId,
      details: JSON.stringify({
        ...details,
        userId: userDetails?.username || 'ANONYMOUS',
        userAuthorities: userDetails?.authorities || [],
        pageTitle: document.title,
        referrer: document.referrer
      }),
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    console.log('Logging audit action:', auditData);
    
    this.http.post(`${this.baseUrl}/log-frontend-action`, auditData).subscribe({
      next: (response) => console.log('Audit logged successfully:', response),
      error: (err) => console.error('Audit logging failed:', err)
    });
  }
}