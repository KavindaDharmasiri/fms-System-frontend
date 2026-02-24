import {Component, OnInit} from '@angular/core';
import {Navigation, Router} from "@angular/router";
import {HighRiskService} from "../../configurations/services/high-risk/high-risk.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-high-risk-transaction-view',
  templateUrl: './high-risk-transaction-view.component.html',
  styleUrl: './high-risk-transaction-view.component.scss'
})
export class HighRiskTransactionViewComponent implements OnInit{
  public highRiskElement: any;
  elementStatus : string = "UNSUCCESSFUL";
  private navigation: Navigation | null;
  protected groupNameString: string = '';

  isGenerating: boolean = false;
  speedometerValue: number = 0;
  generatedRules: string = '';

  showStatusModal: boolean = false;
  newStatus: string = '';
  statusReason: string = '';
  isUpdatingStatus: boolean = false;

  constructor(
    private router: Router,
    private highRiskService: HighRiskService,
    private http: HttpClient
  ) {
    this.navigation = this.router.getCurrentNavigation();
  }

  rules: any[] = [];

  groupedRules: { [key: string]: any[] } = {};
  expandedGroups: { [key: number]: boolean } = {};

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.highRiskElement = this.highRiskService.getElement();
    if (this.highRiskElement) {
      this.elementStatus = "SUCCESSFUL";
      this.rules = this.highRiskElement.transactionFlaggedRulesCollection || [];
      this.rules.forEach(rule => {
        const groupName = rule.ruleGroupName;
        if (!this.groupedRules[groupName]) {
          this.groupedRules[groupName] = [];
        }
        this.groupedRules[groupName].push(rule);
      });
      this.groupNameString = this.getGroupNameString();
    } else {
      this.elementStatus = "UNSUCCESSFUL";
      console.log("failed");
    }
  }

  getGroupNameString(): string {
    const uniqueGroups = Array.from(new Set(this.rules.map(r => r.ruleGroupName)));
    return uniqueGroups.join(' | ');
  }

  trackByRuleName(index: number, rule: any): any {
    return rule.ruleName || index;
  }

  toggleGroup(index: number): void {
    this.expandedGroups[index] = !this.expandedGroups[index];
  }

  generateFutureRules(): void {
    this.isGenerating = true;
    this.speedometerValue = 0;
    this.generatedRules = '';

    const interval = setInterval(() => {
      this.speedometerValue += Math.random() * 15;
      if (this.speedometerValue > 100) this.speedometerValue = 100;
    }, 100);

    this.http.post('http://localhost:8765/fms-core-service/api/v1/tran/generate-future-rules', {})
      .subscribe({
        next: (response: any) => {
          clearInterval(interval);
          this.speedometerValue = 100;
          this.generatedRules = response;
          setTimeout(() => {
            this.isGenerating = false;
          }, 500);
        },
        error: (error) => {
          clearInterval(interval);
          this.isGenerating = false;
          console.error('Error generating rules:', error);
        }
      });
  }

  openStatusModal(): void {
    this.showStatusModal = true;
    this.newStatus = '';
    this.statusReason = '';
  }

  closeStatusModal(): void {
    this.showStatusModal = false;
  }

  updateStatus(): void {
    if (!this.newStatus || !this.statusReason) {
      alert('Please select status and provide reason');
      return;
    }

    this.isUpdatingStatus = true;
    const updateData = {
      transactionUuid: this.highRiskElement.tranUuid,
      newStatus: this.newStatus,
      reason: this.statusReason,
      reviewedBy: 'admin'
    };

    this.http.put('fms-core-service/api/v1/tran/update-status', updateData)
      .subscribe({
        next: (response: any) => {
          this.isUpdatingStatus = false;
          this.showStatusModal = false;
          alert('Status updated successfully');
          this.loadData();
        },
        error: (error) => {
          this.isUpdatingStatus = false;
          console.error('Error updating status:', error);
          alert('Failed to update status');
        }
      });
  }
}
