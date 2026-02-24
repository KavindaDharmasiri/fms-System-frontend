import {Component, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {GetAllRolesRequestDTO, RoleDTO} from "../../user-management/user-role-management/dto/Role";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {RoleService} from "../../user-management/user-role-management/service/role.service";
import {ValidateTransactionDTO} from "../DTOs/ValidateTransactionDTO";
import {ValidateTransactionService} from "../service/validate-transaction.service";
import {DateTime} from "luxon";
import {ValidateTransactionViewComponent} from "../validate-transaction-view/validate-transaction-view.component";
import {HttpClient} from "@angular/common/http";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validate-transaction-page',
  templateUrl: './validate-transaction-page.component.html',
  styleUrl: './validate-transaction-page.component.scss'
})
export class ValidateTransactionPageComponent {
  isFilterOpen = false;
  TransactionValidateFilter: FormGroup;
  displayedColumns: string[] = [
    'validate-transaction_id',
    'transaction-time',
    'validation',
    'action',
  ];
  dataSource = new MatTableDataSource<ValidateTransactionDTO>([]);
  totalItems = 0; // Total number of items from the backend
  pageSize = 5; // Default page size
  currentPage = 0; // Start from page 1
  validateTransactionDTO = new ValidateTransactionDTO();

  isGenerating: boolean = false;
  isTraining: boolean = false;
  speedometerValue: number = 0;
  generatedRules: string = '';
  isDeploying: boolean = false;
  ruleMetadata: any = null;
  showMetadata: boolean = false;
  expandedRules: { [key: number]: boolean } = {};
  expandedRuleCode: { [key: number]: boolean } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('rulesContainer') rulesContainer!: ElementRef;

  private isResizing = false;
  private startY = 0;
  private startHeight = 0;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private validationTransactionServise: ValidateTransactionService,
    private http: HttpClient
  ) {
    this.TransactionValidateFilter = this.fb.group({
      validateTransactionId: [undefined],
      fromTransactionTime: [''],
      toTransactionTime: [''],
      Status: [''],
    });
  }

  fetchData() {
    this.validateTransactionDTO.page = this.currentPage;
    this.validateTransactionDTO.size = this.pageSize;
    this.validateTransactionDTO.validateTransactionId = undefined;
    this.validateTransactionDTO.isValid = undefined;
    this.validateTransactionDTO.errorMessage = '';
    this.validateTransactionDTO.transactionTime = '';
    this.validateTransactionDTO.fromTransactionTime = '';
    this.validateTransactionDTO.toTransactionTime = '';

    const cleanedDTO = Object.fromEntries(
      Object.entries(this.validateTransactionDTO).filter(
        ([_, v]) => v !== undefined && v !== ''
      )
    );

    this.validationTransactionServise
      .getAllValidateTransactions(cleanedDTO)
      .subscribe((response: any) => {
        this.dataSource.data = response.data;
        this.totalItems = response.metadata?.pagination?.totalElements || 0;
        this.paginator.length = this.totalItems;
      });
  }

  applyFilter(): void {
    const rawId = this.TransactionValidateFilter.get('validateTransactionId')?.value;
    const statusValue = this.TransactionValidateFilter.get('Status')?.value;
    this.validateTransactionDTO.page = this.currentPage;
    this.validateTransactionDTO.size = this.pageSize;
    this.validateTransactionDTO.validateTransactionId = rawId && !isNaN(rawId) ? Number(rawId) : undefined;
    this.validateTransactionDTO.isValid =
      statusValue === 'true' ? true :
        statusValue === 'false' ? false :
          undefined;
    this.validateTransactionDTO.errorMessage = '';
    this.validateTransactionDTO.transactionTime = '';
    this.validateTransactionDTO.isoMessage = '';
    console.log(this.validateTransactionDTO.isValid)
    // Get raw date inputs
    const fromDate = this.TransactionValidateFilter.get('fromTransactionTime')?.value;
    const toDate = this.TransactionValidateFilter.get('toTransactionTime')?.value;

    // Convert only if values exist
    // this.validateTransactionDTO.fromTransactionTime = fromDate ? DateTime.toString() : undefined;
    // this.validateTransactionDTO.toTransactionTime = toDate ? DateTime.toString() : undefined;

    this.validateTransactionDTO.fromTransactionTime = fromDate
      ? DateTime.fromJSDate(fromDate).toFormat("yyyy-MM-dd HH:mm:ss")
      : undefined;

    this.validateTransactionDTO.toTransactionTime = toDate
      ? DateTime.fromJSDate(toDate).toFormat("yyyy-MM-dd HH:mm:ss")
      : undefined;


    const cleanedDTO = Object.fromEntries(
      Object.entries(this.validateTransactionDTO).filter(
        ([_, v]) => v !== undefined && v !== ''
      )
    );

    this.validationTransactionServise
      .getAllValidateTransactions(cleanedDTO)
      .subscribe((response: any) => {
        this.dataSource.data = response.data;
        this.totalItems = response.metadata?.pagination?.totalElements || 0;
        this.paginator.length = this.totalItems;
      });
  }

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  openViewUserRole(element: ValidateTransactionDTO) {
    const dialogRef = this.dialog.open(ValidateTransactionViewComponent,{
      width: '500px',
      data:{
        element
      }
    });
  }

  resetFilter() {
    this.TransactionValidateFilter.reset();
    this.validateTransactionDTO = new ValidateTransactionDTO();
    this.fetchData();
  }

  trainModel(): void {
    if (this.isTraining) return;

    this.isTraining = true;
    this.speedometerValue = 0;

    const interval = setInterval(() => {
      this.speedometerValue += Math.random() * 10;
      if (this.speedometerValue > 95) this.speedometerValue = 95;
    }, 500);

    this.http.post('/fms-core-service/api/v1/tran/train-fraud-model', {})
      .subscribe({
        next: (response: any) => {
          clearInterval(interval);
          this.speedometerValue = 100;
          
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'Model Trained!',
              text: response.message || 'Model trained successfully. You can now generate rules.',
              confirmButtonText: 'OK'
            });
          } else {
            throw new Error(response.error || 'Training failed');
          }
          
          setTimeout(() => {
            this.isTraining = false;
            this.speedometerValue = 0;
          }, 1000);
        },
        error: (error) => {
          clearInterval(interval);
          this.isTraining = false;
          this.speedometerValue = 0;
          console.error('Error training model:', error);
          Swal.fire({
            icon: 'error',
            title: 'Training Failed',
            text: error.error?.message || 'Failed to train model'
          });
        }
      });
  }

  generateFutureRules(): void {
    if (this.isGenerating) return;

    this.isGenerating = true;
    this.speedometerValue = 0;
    this.generatedRules = '';
    this.ruleMetadata = null;

    const interval = setInterval(() => {
      this.speedometerValue += Math.random() * 15;
      if (this.speedometerValue > 100) this.speedometerValue = 100;
    }, 100);

    this.http.post('/fms-core-service/api/v1/tran/generate-future-rules', {})
      .subscribe({
        next: (response: any) => {
          clearInterval(interval);
          this.speedometerValue = 100;
          
          if (response.success) {
            this.generatedRules = response.rules || '';
            this.ruleMetadata = response.metadata || {};
            
            Swal.fire({
              icon: 'success',
              title: 'Rules Generated!',
              html: `
                <div style="text-align: left;">
                  <p><strong>Total Rules:</strong> ${this.ruleMetadata.total_rules || 0}</p>
                  <p><strong>Model Accuracy:</strong> ${this.getModelAccuracy()}%</p>
                  <p><strong>Features Used:</strong> ${this.ruleMetadata.feature_count || 0}</p>
                </div>
              `,
              confirmButtonText: 'View Rules'
            });
          } else {
            throw new Error(response.error || 'Generation failed');
          }
          
          setTimeout(() => {
            this.isGenerating = false;
          }, 500);
        },
        error: (error) => {
          clearInterval(interval);
          this.isGenerating = false;
          console.error('Error generating rules:', error);
          Swal.fire({
            icon: 'error',
            title: 'Generation Failed',
            text: error.error?.message || 'Failed to generate rules'
          });
        }
      });
  }
  
  getModelAccuracy(): string {
    if (!this.ruleMetadata) return 'N/A';
    if (this.ruleMetadata.model_f1_score) {
      return (this.ruleMetadata.model_f1_score * 100).toFixed(1);
    }
    if (this.ruleMetadata.metrics) {
      const metrics = this.ruleMetadata.metrics;
      const bestModel = Object.keys(metrics).reduce((a, b) => 
        metrics[a].accuracy > metrics[b].accuracy ? a : b
      );
      return (metrics[bestModel].accuracy * 100).toFixed(1);
    }
    return 'N/A';
  }
  
  getMetricAccuracy(value: any): string {
    return value?.accuracy ? (value.accuracy * 100).toFixed(1) : 'N/A';
  }
  
  toggleMetadata(): void {
    this.showMetadata = !this.showMetadata;
  }
  
  toggleRuleDetails(index: number): void {
    this.expandedRules[index] = !this.expandedRules[index];
  }
  
  toggleRuleCode(index: number): void {
    this.expandedRuleCode[index] = !this.expandedRuleCode[index];
  }
  
  extractConfidence(rule: string): string {
    const match = rule.match(/Confidence[=:]\s*(\d+\.?\d*)%/);
    return match ? `${match[1]}% Confidence` : 'N/A';
  }

  private decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    const decoded = txt.value;
    return this.formatRules(decoded);
  }

  private formatRules(rules: string): string {
    return rules;
  }

  get rulesArray(): string[] {
    return this.generatedRules.split(/(?=import net\.com\.fms_core)/)
      .filter(rule => rule.trim())
      .map(rule => rule.trim());
  }

  deployRules(): void {
    this.isDeploying = true;
    this.http.get('http://localhost:4200/fms-core-service/api/v1/tran/deploy-ai-rules', {responseType: 'text'})
      .subscribe({
        next: (response: string) => {
          this.isDeploying = false;
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response
          });
        },
        error: (error) => {
          this.isDeploying = false;
          console.error('Error deploying rules:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to deploy rules'
          });
        }
      });
  }

  startResize(event: MouseEvent): void {
    this.isResizing = true;
    this.startY = event.clientY;
    this.startHeight = this.rulesContainer.nativeElement.offsetHeight;
    event.preventDefault();

    const onMouseMove = (e: MouseEvent) => {
      if (this.isResizing) {
        const delta = e.clientY - this.startY;
        const newHeight = this.startHeight + delta;
        if (newHeight >= 100 && newHeight <= window.innerHeight * 0.7) {
          this.rulesContainer.nativeElement.style.maxHeight = newHeight + 'px';
        }
      }
    };

    const onMouseUp = () => {
      this.isResizing = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}
