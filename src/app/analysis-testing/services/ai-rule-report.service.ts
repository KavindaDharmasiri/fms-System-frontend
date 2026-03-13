import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

export interface ReportRequest {
  testResults: any[];
  ruleGroupName: string;
  startDate?: string;
  endDate?: string;
}

export interface ReportDownloadOptions {
  filename: string;
  successMessage: string;
  errorMessage: string;
}

@Injectable({
  providedIn: 'root'
})
export class AIRuleReportService {
  private readonly baseUrl = 'http://localhost:4200/fms-core-service/api/v1/ai-rules/test';

  constructor(private http: HttpClient) {}

  /**
   * Download Excel report
   */
  downloadExcelReport(request: ReportRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/download-report`, request, { responseType: 'blob' });
  }

  /**
   * Download text-based comprehensive report
   */
  downloadTextReport(request: ReportRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/download-pdf-report`, request, { responseType: 'blob' });
  }

  /**
   * Download professional JasperReports PDF
   */
  downloadJasperPDFReport(request: ReportRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/download-jasper-pdf-report`, request, { responseType: 'blob' });
  }

  /**
   * Download detailed analysis JasperReports PDF
   */
  downloadDetailedJasperReport(request: ReportRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/download-detailed-jasper-report`, request, { responseType: 'blob' });
  }

  /**
   * Download executive summary JasperReports PDF
   */
  downloadExecutiveJasperReport(request: ReportRequest): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/download-executive-jasper-report`, request, { responseType: 'blob' });
  }

  /**
   * Generic method to handle blob download
   */
  handleBlobDownload(blob: Blob, options: ReportDownloadOptions): void {
    try {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = options.filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      Swal.fire('Success', options.successMessage, 'success');
    } catch (error) {
      console.error('Error handling blob download:', error);
      Swal.fire('Error', options.errorMessage, 'error');
    }
  }

  /**
   * Generate filename with timestamp
   */
  generateFilename(prefix: string, groupName: string, extension: string): string {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
    const cleanGroupName = groupName.replace(/[^a-zA-Z0-9]/g, '_');
    return `${prefix}_${cleanGroupName}_${timestamp}.${extension}`;
  }

  /**
   * Validate report request
   */
  validateReportRequest(testResults: any[]): boolean {
    if (!testResults || testResults.length === 0) {
      Swal.fire('Error', 'No test results available to download', 'error');
      return false;
    }
    return true;
  }

  /**
   * Handle download error
   */
  handleDownloadError(error: any, reportType: string): void {
    console.error(`Error downloading ${reportType}:`, error);
    Swal.fire('Error', `Failed to download ${reportType}`, 'error');
  }
}