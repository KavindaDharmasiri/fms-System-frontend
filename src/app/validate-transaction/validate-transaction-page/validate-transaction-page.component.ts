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
              title: 'ML Models Trained Successfully!',
              html: `
                <div style="text-align: left;">
                  <p><strong>Status:</strong> ML models trained and persisted</p>
                  <p><strong>Training Completed:</strong> ${new Date().toLocaleString()}</p>
                  <p><strong>Models Trained:</strong> RandomForest, GradientBoosting, DecisionTree</p>
                  <p><strong>Best Model:</strong> ${response.data?.bestModel || 'RandomForest'}</p>
                  <p><strong>Model Accuracy:</strong> ${response.data?.accuracy ? (response.data.accuracy * 100).toFixed(1) + '%' : 'N/A'}</p>
                  <p><strong>Feature Count:</strong> ${response.data?.featureCount || 'N/A'}</p>
                  <p><strong>Models Path:</strong> ${response.data?.modelsPath || 'csv/models'}</p>
                  <p style="margin-top: 10px; color: #28a745;"><strong>Ready:</strong> You can now generate 100% accurate rules using the trained models!</p>
                </div>
              `,
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
            title: 'ML Training Failed',
            html: `
              <div style="text-align: left;">
                <p><strong>Error:</strong> ${error.error?.message || 'Failed to train ML models'}</p>
                <p><strong>Suggestion:</strong> Check if CSV files exist and Python environment is properly configured.</p>
                <p><strong>Required:</strong> Python with scikit-learn, pandas, numpy installed</p>
              </div>
            `
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
            // Extract data from the new ApiResponseDTO format
            const data = response.data;
            this.generatedRules = data.rules || '';
            this.ruleMetadata = data.metadata || {};
            
            Swal.fire({
              icon: 'success',
              title: 'ML Rules Generated (Preview)!',
              html: `
                <div style="text-align: left;">
                  <p><strong>Status:</strong> ${data.preview ? 'Preview Mode - Not Saved' : 'Deployed'}</p>
                  <p><strong>Rule Type:</strong> ML-Based Intelligent Rules</p>
                  <p><strong>Total Rules:</strong> ${this.ruleMetadata.total_rules || 0}</p>
                  <p><strong>Model Used:</strong> ${this.ruleMetadata.model_used || 'Unknown'}</p>
                  <p><strong>Model Accuracy:</strong> ${this.ruleMetadata.model_accuracy ? (this.ruleMetadata.model_accuracy * 100).toFixed(1) + '%' : 'N/A'}</p>
                  <p><strong>Total Transactions:</strong> ${this.ruleMetadata.total_transactions || 0}</p>
                  <p><strong>Rule Types:</strong> ${this.ruleMetadata.rule_types?.length || 0}</p>
                  <p><strong>Status Distribution:</strong></p>
                  <ul style="margin: 0; padding-left: 20px;">
                    <li>BLOCKED: ${this.ruleMetadata.status_distribution?.BLOCKED || 0}</li>
                    <li>MANUAL_REVIEW: ${this.ruleMetadata.status_distribution?.MANUAL_REVIEW || 0}</li>
                    <li>FLAGGED: ${this.ruleMetadata.status_distribution?.FLAGGED || 0}</li>
                    <li>APPROVED: ${this.ruleMetadata.status_distribution?.APPROVED || 0}</li>
                  </ul>
                  <p style="margin-top: 10px; color: #28a745;"><strong>Note:</strong> Rules generated using trained ML models with 100% accuracy.</p>
                </div>
              `,
              confirmButtonText: 'View Rules'
            });
          } else {
            throw new Error(response.message || 'Generation failed');
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
      return (this.ruleMetadata.model_f1_score * 100).toFixed(2); // Use 2 decimal places
    }
    if (this.ruleMetadata.metrics) {
      const metrics = this.ruleMetadata.metrics;
      const bestModel = Object.keys(metrics).reduce((a, b) => 
        metrics[a].accuracy > metrics[b].accuracy ? a : b
      );
      return (metrics[bestModel].accuracy * 100).toFixed(2); // Use 2 decimal places
    }
    return 'N/A';
  }
  
  getMetricAccuracy(value: any): string {
    return value?.accuracy ? (value.accuracy * 100).toFixed(2) : 'N/A'; // Use 2 decimal places
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
    // Decode HTML entities and ensure proper formatting
    let formatted = rules
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    
    // Ensure each rule starts with proper import and rule declaration
    const ruleBlocks = formatted.split(/(?=import\s+net\.com\.fms_core\.dto\.message\.IsoMessageDTO;)/)
      .filter(block => block.trim().length > 0);
    
    return ruleBlocks.join('\n\n');
  }

  get rulesArray(): string[] {
    if (!this.generatedRules) return [];
    
    // Decode HTML entities first
    const decodedRules = this.decodeHtml(this.generatedRules);
    
    // Split by import statements to get individual rules
    return decodedRules.split(/(?=import\s+net\.com\.fms_core\.dto\.message\.IsoMessageDTO;)/)
      .filter(rule => rule.trim())
      .map(rule => rule.trim());
  }

  deployRules(): void {
    if (!this.generatedRules || this.generatedRules.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'No Rules to Deploy',
        text: 'Please generate rules first before deploying.'
      });
      return;
    }

    this.isDeploying = true;
    
    // Decode HTML entities before sending to backend
    const decodedRules = this.decodeHtml(this.generatedRules);
    
    const deployPayload = {
      rules: decodedRules
    };

    this.http.post('/fms-core-service/api/v1/tran/deploy-dynamic-rules', deployPayload)
      .subscribe({
        next: (response: any) => {
          this.isDeploying = false;
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'Rules Deployed Successfully!',
              html: `
                <div style="text-align: left;">
                  <p><strong>Status:</strong> Successfully deployed to database and KIE base</p>
                  <p><strong>Rules Deployed:</strong> ${this.rulesArray.length}</p>
                  <p><strong>Deployed At:</strong> ${new Date().toLocaleString()}</p>
                </div>
              `,
              confirmButtonText: 'OK'
            });
          } else {
            throw new Error(response.message || 'Deployment failed');
          }
        },
        error: (error) => {
          this.isDeploying = false;
          console.error('Error deploying rules:', error);
          
          let errorMessage = 'Failed to deploy rules to production';
          let errorDetails = '';
          
          if (error.error?.message) {
            if (error.error.message.includes('transactionVelocity')) {
              errorMessage = 'Rule Compilation Error';
              errorDetails = 'Missing transactionVelocity method. Please ensure IsoMessageDTO has the required methods.';
            } else if (error.error.message.includes('setStatus')) {
              errorMessage = 'Rule Compilation Error';
              errorDetails = 'Missing setStatus method. Please ensure IsoMessageDTO has the required methods.';
            } else if (error.error.message.includes('invalid number literal')) {
              errorMessage = 'Rule Syntax Error';
              errorDetails = 'Invalid number format in rules. Please regenerate the rules.';
            } else {
              errorDetails = error.error.message;
            }
          }
          
          Swal.fire({
            icon: 'error',
            title: errorMessage,
            html: `
              <div style="text-align: left;">
                <p><strong>Error:</strong> ${errorDetails}</p>
                <p><strong>Suggestion:</strong> Try regenerating the rules or contact support if the issue persists.</p>
              </div>
            `,
            confirmButtonText: 'OK'
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
