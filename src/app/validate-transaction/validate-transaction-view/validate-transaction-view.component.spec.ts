import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateTransactionViewComponent } from './validate-transaction-view.component';

describe('ValidateTransactionViewComponent', () => {
  let component: ValidateTransactionViewComponent;
  let fixture: ComponentFixture<ValidateTransactionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidateTransactionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidateTransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
