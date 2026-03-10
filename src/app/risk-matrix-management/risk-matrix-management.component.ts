import { Component, OnInit } from '@angular/core';
import { RiskMatrixService } from './service/risk-matrix.service';
import { RiskMatrixDTO } from './dto/RiskMatrixDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-risk-matrix-management',
  templateUrl: './risk-matrix-management.component.html',
  styleUrls: ['./risk-matrix-management.component.scss']
})
export class RiskMatrixManagementComponent implements OnInit {

  riskMatrixList: RiskMatrixDTO[] = [];
  selectedRiskMatrix: RiskMatrixDTO = { flag: '', minValue: 0, maxValue: 0 };
  isEditMode = false;
  showForm = false;

  constructor(private riskMatrixService: RiskMatrixService) { }

  ngOnInit(): void {
    this.loadRiskMatrix();
  }

  loadRiskMatrix(): void {
    this.riskMatrixService.getAllRiskMatrix().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.riskMatrixList = response.data;
        }
      },
      error: (error) => {
        Swal.fire('Error', 'Failed to load risk matrix', 'error');
      }
    });
  }

  showAddForm(): void {
    this.selectedRiskMatrix = { flag: '', minValue: 0, maxValue: 0 };
    this.isEditMode = false;
    this.showForm = true;
  }

  editRiskMatrix(riskMatrix: RiskMatrixDTO): void {
    this.selectedRiskMatrix = { ...riskMatrix };
    this.isEditMode = true;
    this.showForm = true;
  }

  saveRiskMatrix(): void {
    if (this.isEditMode) {
      this.riskMatrixService.updateRiskMatrix(this.selectedRiskMatrix).subscribe({
        next: (response) => {
          if (response.success) {
            Swal.fire('Success', 'Risk matrix updated successfully', 'success');
            this.loadRiskMatrix();
            this.cancelForm();
          }
        },
        error: (error) => {
          Swal.fire('Error', 'Failed to update risk matrix', 'error');
        }
      });
    } else {
      this.riskMatrixService.saveRiskMatrix(this.selectedRiskMatrix).subscribe({
        next: (response) => {
          if (response.success) {
            Swal.fire('Success', 'Risk matrix saved successfully', 'success');
            this.loadRiskMatrix();
            this.cancelForm();
          }
        },
        error: (error) => {
          Swal.fire('Error', 'Failed to save risk matrix', 'error');
        }
      });
    }
  }

  deleteRiskMatrix(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this risk matrix!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.riskMatrixService.deleteRiskMatrix(id).subscribe({
          next: (response) => {
            if (response.success) {
              Swal.fire('Deleted!', 'Risk matrix has been deleted.', 'success');
              this.loadRiskMatrix();
            }
          },
          error: (error) => {
            Swal.fire('Error', 'Failed to delete risk matrix', 'error');
          }
        });
      }
    });
  }

  cancelForm(): void {
    this.showForm = false;
    this.selectedRiskMatrix = { flag: '', minValue: 0, maxValue: 0 };
    this.isEditMode = false;
  }

  getRiskLevelClass(flag: string): string {
    switch (flag.toLowerCase()) {
      case 'low': return 'badge bg-success';
      case 'medium': return 'badge bg-warning';
      case 'high': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }
}