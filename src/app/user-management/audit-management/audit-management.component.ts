import { Component, OnInit } from '@angular/core';
import { AuditService } from '../../shared/services/audit.service';

@Component({
  selector: 'app-audit-management',
  templateUrl: './audit-management.component.html',
  styleUrls: ['./audit-management.component.scss']
})
export class AuditManagementComponent implements OnInit {
  auditLogs: any[] = [];
  selectedLog: any = null;
  
  filters = {
    userId: '',
    startDate: '',
    endDate: ''
  };
  
  currentPage = 0;
  pageSize = 20;
  totalElements = 0;
  totalPages = 0;
  Math = Math;

  constructor(private auditService: AuditService) {}

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  loadAuditLogs(): void {
    if (this.filters.userId) {
      this.auditService.getAuditLogsByUser(this.filters.userId, this.currentPage, this.pageSize)
        .subscribe(response => this.handleResponse(response));
    } else if (this.filters.startDate && this.filters.endDate) {
      this.auditService.getAuditLogsByDateRange(this.filters.startDate, this.filters.endDate, this.currentPage, this.pageSize)
        .subscribe(response => this.handleResponse(response));
    } else {
      this.auditService.getAuditLogs(this.currentPage, this.pageSize)
        .subscribe(response => this.handleResponse(response));
    }
  }

  handleResponse(response: any): void {
    this.auditLogs = response.content || [];
    this.totalElements = response.totalElements || 0;
    this.totalPages = response.totalPages || 0;
  }

  clearFilters(): void {
    this.filters = { userId: '', startDate: '', endDate: '' };
    this.currentPage = 0;
    this.loadAuditLogs();
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadAuditLogs();
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    const start = Math.max(0, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 5);
    
    for (let i = start; i < end; i++) {
      pages.push(i);
    }
    return pages;
  }

  viewDetails(log: any): void {
    this.selectedLog = log;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('detailsModal'));
    modal.show();
  }

  getActionBadgeClass(action: string): string {
    const actionClasses: { [key: string]: string } = {
      'LOGIN': 'bg-success',
      'LOGOUT': 'bg-info',
      'CREATE': 'bg-primary',
      'UPDATE': 'bg-warning',
      'DELETE': 'bg-danger',
      'VIEW': 'bg-secondary'
    };
    
    for (const key in actionClasses) {
      if (action.includes(key)) {
        return actionClasses[key];
      }
    }
    return 'bg-secondary';
  }

  getStatusBadgeClass(status: string): string {
    return status === 'SUCCESS' ? 'bg-success' : 'bg-danger';
  }
}