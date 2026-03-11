import { Component, OnInit, OnDestroy } from '@angular/core';
import { AiToggleService } from '../../services/ai-toggle.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ai-toggle',
  template: `
    <div class="ai-toggle-container">
      <label class="ai-toggle-label">
        <input 
          type="checkbox" 
          [checked]="isAIEnabled" 
          (change)="onToggleChange($event)"
          class="ai-toggle-input">
        <span class="ai-toggle-slider"></span>
        <span class="ai-toggle-text">Use AI Rules</span>
      </label>
    </div>
  `,
  styles: [`
    .ai-toggle-container {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }

    .ai-toggle-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }

    .ai-toggle-input {
      display: none;
    }

    .ai-toggle-slider {
      position: relative;
      width: 50px;
      height: 24px;
      background-color: #ccc;
      border-radius: 24px;
      transition: background-color 0.3s;
      margin-right: 8px;
    }

    .ai-toggle-slider:before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: white;
      top: 2px;
      left: 2px;
      transition: transform 0.3s;
    }

    .ai-toggle-input:checked + .ai-toggle-slider {
      background-color: #4CAF50;
    }

    .ai-toggle-input:checked + .ai-toggle-slider:before {
      transform: translateX(26px);
    }

    .ai-toggle-text {
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }
  `]
})
export class AiToggleComponent implements OnInit, OnDestroy {
  isAIEnabled = false;
  private destroy$ = new Subject<void>();

  constructor(private aiToggleService: AiToggleService) {}

  ngOnInit(): void {
    this.aiToggleService.aiToggle$
      .pipe(takeUntil(this.destroy$))
      .subscribe(enabled => {
        this.isAIEnabled = enabled;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.checked;
    
    this.aiToggleService.updateToggleStatus(newValue).subscribe({
      next: (response) => {
        console.log('AI toggle updated:', response.useAIRules);
      },
      error: (error) => {
        console.error('Failed to update AI toggle:', error);
        // Revert the toggle on error
        this.isAIEnabled = !newValue;
      }
    });
  }
}