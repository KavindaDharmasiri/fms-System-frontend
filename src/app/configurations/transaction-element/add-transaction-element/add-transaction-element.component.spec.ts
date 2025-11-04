import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionElementComponent } from './add-transaction-element.component';

describe('AddTransactionElementComponent', () => {
  let component: AddTransactionElementComponent;
  let fixture: ComponentFixture<AddTransactionElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTransactionElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTransactionElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
