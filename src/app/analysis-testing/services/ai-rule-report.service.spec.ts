import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AIRuleReportService, ReportRequest } from './ai-rule-report.service';

describe('AIRuleReportService', () => {
  let service: AIRuleReportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AIRuleReportService]
    });
    service = TestBed.inject(AIRuleReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should download Excel report', () => {
    const mockRequest: ReportRequest = {
      testResults: [],
      ruleGroupName: 'Test Group',
      startDate: '2026-03-13T00:00:00.000Z',
      endDate: '2026-03-13T23:59:59.000Z'
    };

    const mockBlob = new Blob(['test'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    service.downloadExcelReport(mockRequest).subscribe(blob => {
      expect(blob).toBeTruthy();
      expect(blob.type).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    });

    const req = httpMock.expectOne('http://localhost:4200/fms-core-service/api/v1/ai-rules/test/download-report');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequest);
    req.flush(mockBlob);
  });

  it('should download JasperReports PDF', () => {
    const mockRequest: ReportRequest = {
      testResults: [],
      ruleGroupName: 'Test Group'
    };

    const mockBlob = new Blob(['test'], { type: 'application/pdf' });

    service.downloadJasperPDFReport(mockRequest).subscribe(blob => {
      expect(blob).toBeTruthy();
      expect(blob.type).toBe('application/pdf');
    });

    const req = httpMock.expectOne('http://localhost:4200/fms-core-service/api/v1/ai-rules/test/download-jasper-pdf-report');
    expect(req.request.method).toBe('POST');
    req.flush(mockBlob);
  });

  it('should generate filename with timestamp', () => {
    const filename = service.generateFilename('Test_Report', 'My Rule Group', 'pdf');
    
    expect(filename).toMatch(/^Test_Report_My_Rule_Group_\d{8}T\d{6}\.pdf$/);
  });

  it('should validate report request', () => {
    expect(service.validateReportRequest([])).toBeFalsy();
    expect(service.validateReportRequest([{ id: 1 }])).toBeTruthy();
  });

  it('should handle blob download', () => {
    const mockBlob = new Blob(['test'], { type: 'application/pdf' });
    const options = {
      filename: 'test.pdf',
      successMessage: 'Success',
      errorMessage: 'Error'
    };

    // Mock URL.createObjectURL and related methods
    const mockUrl = 'blob:mock-url';
    spyOn(window.URL, 'createObjectURL').and.returnValue(mockUrl);
    spyOn(window.URL, 'revokeObjectURL');
    spyOn(document, 'createElement').and.returnValue({
      href: '',
      download: '',
      click: jasmine.createSpy('click'),
      remove: jasmine.createSpy('remove')
    } as any);
    spyOn(document.body, 'appendChild');
    spyOn(document.body, 'removeChild');

    service.handleBlobDownload(mockBlob, options);

    expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
    expect(document.createElement).toHaveBeenCalledWith('a');
  });
});