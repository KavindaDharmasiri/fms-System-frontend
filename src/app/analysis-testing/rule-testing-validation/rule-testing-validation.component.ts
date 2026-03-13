import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TransactionDto} from "../dto/transactionDto";
import {TransactionService} from "../service/transaction.service";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AIRuleReportService, ReportRequest} from "../services/ai-rule-report.service";

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

  constructor(
    private tranService: TransactionService, 
    private http: HttpClient,
    private reportService: AIRuleReportService
  ) {}

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

  private createReportRequest(): ReportRequest {
    const selectedGroup = this.aiRuleGroups.find(g => g.aiRuleGroupId === this.selectedRuleGroupId);
    return {
      testResults: this.testResults,
      ruleGroupName: selectedGroup ? selectedGroup.groupName : 'Unknown Group',
      startDate: this.startDate?.toISOString(),
      endDate: this.endDate?.toISOString()
    };
  }

  downloadReport() {
    if (!this.reportService.validateReportRequest(this.testResults)) {
      return;
    }

    const reportRequest = this.createReportRequest();
    const filename = this.reportService.generateFilename('AI_Rule_Test_Report', reportRequest.ruleGroupName, 'xlsx');

    this.reportService.downloadExcelReport(reportRequest).subscribe({
      next: (blob) => {
        this.reportService.handleBlobDownload(blob, {
          filename,
          successMessage: 'Excel report downloaded successfully',
          errorMessage: 'Failed to download Excel report'
        });
      },
      error: (error) => this.reportService.handleDownloadError(error, 'Excel report')
    });
  }

  downloadPDFReport() {
    if (!this.reportService.validateReportRequest(this.testResults)) {
      return;
    }

    const reportRequest = this.createReportRequest();
    const filename = this.reportService.generateFilename('AI_Rule_Comprehensive_Report', reportRequest.ruleGroupName, 'txt');

    this.reportService.downloadTextReport(reportRequest).subscribe({
      next: (blob) => {
        this.reportService.handleBlobDownload(blob, {
          filename,
          successMessage: 'Comprehensive report downloaded successfully',
          errorMessage: 'Failed to download comprehensive report'
        });
      },
      error: (error) => this.reportService.handleDownloadError(error, 'comprehensive report')
    });
  }

  downloadJasperPDFReport() {
    if (!this.reportService.validateReportRequest(this.testResults)) {
      return;
    }

    const reportRequest = this.createReportRequest();
    const filename = this.reportService.generateFilename('AI_Rule_Professional_Report', reportRequest.ruleGroupName, 'pdf');

    this.reportService.downloadJasperPDFReport(reportRequest).subscribe({
      next: (blob) => {
        this.reportService.handleBlobDownload(blob, {
          filename,
          successMessage: 'Professional PDF report downloaded successfully',
          errorMessage: 'Failed to download professional PDF report'
        });
      },
      error: (error) => this.reportService.handleDownloadError(error, 'professional PDF report')
    });
  }

  downloadDetailedJasperReport() {
    if (!this.reportService.validateReportRequest(this.testResults)) {
      return;
    }

    const reportRequest = this.createReportRequest();
    const filename = this.reportService.generateFilename('AI_Rule_Detailed_Analysis', reportRequest.ruleGroupName, 'pdf');

    this.reportService.downloadDetailedJasperReport(reportRequest).subscribe({
      next: (blob) => {
        this.reportService.handleBlobDownload(blob, {
          filename,
          successMessage: 'Detailed analysis report downloaded successfully',
          errorMessage: 'Failed to download detailed analysis report'
        });
      },
      error: (error) => this.reportService.handleDownloadError(error, 'detailed analysis report')
    });
  }

  downloadExecutiveJasperReport() {
    if (!this.reportService.validateReportRequest(this.testResults)) {
      return;
    }

    const reportRequest = this.createReportRequest();
    const filename = this.reportService.generateFilename('AI_Rule_Executive_Summary', reportRequest.ruleGroupName, 'pdf');

    this.reportService.downloadExecutiveJasperReport(reportRequest).subscribe({
      next: (blob) => {
        this.reportService.handleBlobDownload(blob, {
          filename,
          successMessage: 'Executive summary report downloaded successfully',
          errorMessage: 'Failed to download executive summary report'
        });
      },
      error: (error) => this.reportService.handleDownloadError(error, 'executive summary report')
    });
  }

  reset() {
    this.selectedRuleGroupId = null;
    this.startDate = null;
    this.endDate = null;
    this.testResults = [];
    this.dataSource.data = [];
  }

  getHighRiskTransactions(): number {
    return this.testResults.filter(r => r.newRiskLevel === 'HIGH').length;
  }

  getAverageRiskScore(): number {
    const scores = this.testResults
      .filter(r => r.details?.riskScore)
      .map(r => r.details!.riskScore!);
    
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 100) / 100;
  }

  getTotalAmount(): number {
    return Math.round(this.testResults.reduce((sum, r) => sum + (r.amount || 0), 0) * 100) / 100;
  }

  getMostFiredRule(): string {
    const ruleCount = new Map<string, number>();
    
    this.testResults.forEach(result => {
      if (result.firedAIRules) {
        result.firedAIRules.forEach(rule => {
          ruleCount.set(rule, (ruleCount.get(rule) || 0) + 1);
        });
      }
    });
    
    let maxCount = 0;
    let mostFiredRule = 'None';
    
    ruleCount.forEach((count, rule) => {
      if (count > maxCount) {
        maxCount = count;
        mostFiredRule = rule;
      }
    });
    
    return mostFiredRule;
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
