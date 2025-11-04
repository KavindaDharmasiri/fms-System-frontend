import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighRiskTransactionPageComponent } from './high-risk-transaction-page.component';

describe('HighRiskTransactionPageComponent', () => {
  let component: HighRiskTransactionPageComponent;
  let fixture: ComponentFixture<HighRiskTransactionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighRiskTransactionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighRiskTransactionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
