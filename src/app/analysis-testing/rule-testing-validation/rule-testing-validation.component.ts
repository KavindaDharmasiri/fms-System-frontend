import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TransactionDto} from "../dto/transactionDto";
import {TransactionService} from "../service/transaction.service";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface AIRuleTestResult {
  transactionId: number;
  transactionUuid: string;
  amount: number;
  pan: string;
  originalRiskLevel: string;
  newRiskLevel: string;
  firedAIRules: string[];
  status: string;
  transactionDate: string;
  details: any;
}

export interface AIRuleGroup {
  aiRuleGroupId: number;
  groupName: string;
  groupCode: string;
  description: string;
  ruleCount: number;
}

@Component({
  selector: 'app-rule-testing-validation',
  templateUrl: './rule-testing-validation.component.html',
  styleUrl: './rule-testing-validation.component.scss'
})
export class RuleTestingValidationComponent implements OnInit{

  constructor(private tranService: TransactionService, private http: HttpClient) {
  }

  displayedColumns: string[] = [
    'transactionId',
    'amount',
    'pan',
    'originalRiskLevel',
    'newRiskLevel',
    'status',
    'firedAIRules',
    'action',
  ];
  dataSource = new MatTableDataSource<AIRuleTestResult>([]);

  aiRuleGroups: AIRuleGroup[] = [];
  selectedRuleGroupId: number | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  isLoading = false;
  testResults: AIRuleTestResult[] = [];
  selectedDetails: any = null;

  ngOnInit(): void {
    this.loadAIRuleGroups();
  }

  loadAIRuleGroups() {
    this.http.get<any>('http://localhost:4200/fms-core-service/api/v1/ai-rules/groups')
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.aiRuleGroups = response.data;
          }
        },
        error: (error) => {
          console.error('Error loading AI rule groups:', error);
          Swal.fire('Error', 'Failed to load AI rule groups', 'error');
        }
      });
  }

  testAIRules() {
    if (!this.selectedRuleGroupId || !this.startDate || !this.endDate) {
      Swal.fire('Error', 'Please select rule group and date range', 'error');
      return;
    }

    this.isLoading = true;
    const testRequest = {
      aiRuleGroupId: this.selectedRuleGroupId,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString()
    };

    this.http.post<any>('http://localhost:4200/fms-core-service/api/v1/ai-rules/test', testRequest)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.testResults = response.data;
            this.dataSource.data = this.testResults;
            Swal.fire('Success', `Tested ${this.testResults.length} transactions`, 'success');
          } else {
            Swal.fire('Error', 'Test failed', 'error');
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error testing AI rules:', error);
          Swal.fire('Error', 'Failed to test AI rules', 'error');
        }
      });
  }

  viewDetails(result: AIRuleTestResult) {
    this.selectedDetails = result.details;
    // Show modal or navigate to details view
    Swal.fire({
      title: 'Transaction Details',
      html: `
        <div class="text-left">
          <p><strong>Transaction ID:</strong> ${result.transactionId}</p>
          <p><strong>Amount:</strong> $${result.amount}</p>
          <p><strong>PAN:</strong> ${result.pan}</p>
          <p><strong>Original Risk:</strong> ${result.originalRiskLevel}</p>
          <p><strong>New Risk:</strong> ${result.newRiskLevel}</p>
          <p><strong>Fired AI Rules:</strong> ${result.firedAIRules.join(', ')}</p>
          <p><strong>Block Reason:</strong> ${result.details?.blockReason || 'None'}</p>
          <p><strong>Risk Score:</strong> ${result.details?.riskScore || 'N/A'}</p>
          <p><strong>Fraud Percentage:</strong> ${result.details?.fraudPercentage || 'N/A'}%</p>
        </div>
      `,
      width: '600px',
      confirmButtonText: 'Close'
    });
  }

  reset() {
    this.selectedRuleGroupId = null;
    this.startDate = null;
    this.endDate = null;
    this.testResults = [];
    this.dataSource.data = [];
  }

  getTotalTransactions(): number {
    return this.testResults.length;
  }

  getFlaggedTransactions(): number {
    return this.testResults.filter(r => r.status === 'FLAGGED').length;
  }

  getSuccessfulTransactions(): number {
    return this.testResults.filter(r => r.status === 'PASSED').length;
  }
}
