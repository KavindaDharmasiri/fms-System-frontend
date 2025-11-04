import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionElementViewComponent } from './transaction-element-view.component';

describe('TransactionElementViewComponent', () => {
  let component: TransactionElementViewComponent;
  let fixture: ComponentFixture<TransactionElementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionElementViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionElementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
