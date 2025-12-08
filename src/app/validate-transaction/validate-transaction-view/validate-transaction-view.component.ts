import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-validate-transaction-view',
  templateUrl: './validate-transaction-view.component.html',
  styleUrl: './validate-transaction-view.component.scss'
})
export class ValidateTransactionViewComponent {
  isGenerating: boolean = false;
  speedometerValue: number = 0;
  generatedRules: string = '';

  constructor(
    public dialogRef: MatDialogRef<ValidateTransactionViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

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
}
