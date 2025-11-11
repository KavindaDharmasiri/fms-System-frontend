import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuditService } from './audit.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuditTrackerService {
  private currentUser: string = '';

  constructor(
    private auditService: AuditService,
    private router: Router
  ) {
    console.log('AuditTrackerService initialized');
    this.initializeTracking();
  }

  setCurrentUser(userId: string): void {
    this.currentUser = userId;
  }

  private initializeTracking(): void {
    // Track page navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.trackPageView(event.url);
        }
      });

    // Track clicks
    document.addEventListener('click', (event) => {
      this.trackClick(event);
    });

    // Track form submissions
    document.addEventListener('submit', (event) => {
      this.trackFormSubmission(event);
    });
  }

  trackPageView(url: string): void {
    this.auditService.logUserAction('PAGE_VIEW', 'NAVIGATION', url, {
      url,
      timestamp: new Date().toISOString()
    });
  }

  trackClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      const button = target.tagName === 'BUTTON' ? target : target.closest('button');
      const buttonText = button?.textContent?.trim() || 'Unknown Button';
      
      console.log('Button clicked:', buttonText);
      
      this.auditService.logUserAction('BUTTON_CLICK', 'UI_INTERACTION', buttonText, {
        buttonText,
        elementId: button?.id,
        className: button?.className,
        timestamp: new Date().toISOString()
      });
    }
  }

  trackFormSubmission(event: Event): void {
    const form = event.target as HTMLFormElement;
    const formId = form.id || 'unknown-form';
    
    this.auditService.logUserAction('FORM_SUBMIT', 'FORM_INTERACTION', formId, {
      formId,
      action: form.action,
      method: form.method,
      timestamp: new Date().toISOString()
    });
  }

  trackCustomAction(action: string, entityType: string, entityId?: string, details?: any): void {
    this.auditService.logUserAction(action, entityType, entityId, {
      ...details,
      timestamp: new Date().toISOString(),
      userId: this.currentUser
    });
  }

  trackRuleCreation(ruleId: string, ruleData: any): void {
    this.trackCustomAction('CREATE_RULE', 'FMS_RULE', ruleId, ruleData);
  }

  trackRuleUpdate(ruleId: string, oldData: any, newData: any): void {
    this.trackCustomAction('UPDATE_RULE', 'FMS_RULE', ruleId, { oldData, newData });
  }

  trackRuleDelete(ruleId: string): void {
    this.trackCustomAction('DELETE_RULE', 'FMS_RULE', ruleId);
  }

  trackTransactionView(transactionId: string): void {
    this.trackCustomAction('VIEW_TRANSACTION', 'TRANSACTION', transactionId);
  }

  trackConfigurationChange(configType: string, configId: string, changes: any): void {
    this.trackCustomAction('CONFIG_CHANGE', configType, configId, changes);
  }
}