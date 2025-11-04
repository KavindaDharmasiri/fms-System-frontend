import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateTransactionPageComponent } from './validate-transaction-page.component';

describe('ValidateTransactionPageComponent', () => {
  let component: ValidateTransactionPageComponent;
  let fixture: ComponentFixture<ValidateTransactionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidateTransactionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidateTransactionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
