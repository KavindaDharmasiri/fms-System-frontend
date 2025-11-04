import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighRiskTransactionViewComponent } from './high-risk-transaction-view.component';

describe('HighRiskTransactionViewComponent', () => {
  let component: HighRiskTransactionViewComponent;
  let fixture: ComponentFixture<HighRiskTransactionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighRiskTransactionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighRiskTransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
