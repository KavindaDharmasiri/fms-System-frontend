import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AIToggleResponse {
  useAIRules: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AiToggleService {
  private apiUrl = 'http://localhost:4200/fms-core-service/api/v1/ai-toggle';
  private aiToggleSubject = new BehaviorSubject<boolean>(false);
  public aiToggle$ = this.aiToggleSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadToggleStatus();
  }

  getToggleStatus(): Observable<AIToggleResponse> {
    return this.http.get<AIToggleResponse>(this.apiUrl);
  }

  updateToggleStatus(useAIRules: boolean): Observable<AIToggleResponse> {
    return this.http.post<AIToggleResponse>(this.apiUrl, { useAIRules })
      .pipe(
        tap(response => this.aiToggleSubject.next(response.useAIRules))
      );
  }

  private loadToggleStatus(): void {
    this.getToggleStatus().subscribe({
      next: (response) => this.aiToggleSubject.next(response.useAIRules),
      error: (error) => console.error('Failed to load AI toggle status:', error)
    });
  }

  getCurrentStatus(): boolean {
    return this.aiToggleSubject.value;
  }
}
