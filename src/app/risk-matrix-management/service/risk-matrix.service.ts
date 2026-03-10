import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RiskMatrixDTO } from '../dto/RiskMatrixDTO';
import { ApiResponseDTO } from '../../shared/dto/ApiResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class RiskMatrixService {

  constructor(private http: HttpClient) { }

  getAllRiskMatrix(): Observable<ApiResponseDTO<RiskMatrixDTO[]>> {
    return this.http.get<ApiResponseDTO<RiskMatrixDTO[]>>(environment.CORE_SERVICE.RISK_MATRIX.GET_ALL);
  }

  getRiskMatrixById(id: number): Observable<ApiResponseDTO<RiskMatrixDTO>> {
    return this.http.get<ApiResponseDTO<RiskMatrixDTO>>(`${environment.CORE_SERVICE.RISK_MATRIX.GET_BY_ID}/${id}`);
  }

  saveRiskMatrix(riskMatrix: RiskMatrixDTO): Observable<ApiResponseDTO<RiskMatrixDTO>> {
    return this.http.post<ApiResponseDTO<RiskMatrixDTO>>(environment.CORE_SERVICE.RISK_MATRIX.SAVE, riskMatrix);
  }

  updateRiskMatrix(riskMatrix: RiskMatrixDTO): Observable<ApiResponseDTO<RiskMatrixDTO>> {
    return this.http.put<ApiResponseDTO<RiskMatrixDTO>>(environment.CORE_SERVICE.RISK_MATRIX.UPDATE, riskMatrix);
  }

  deleteRiskMatrix(id: number): Observable<ApiResponseDTO<string>> {
    return this.http.delete<ApiResponseDTO<string>>(`${environment.CORE_SERVICE.RISK_MATRIX.DELETE}/${id}`);
  }
}