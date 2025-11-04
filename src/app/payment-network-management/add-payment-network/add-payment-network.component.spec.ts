import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentNetworkComponent } from './add-payment-network.component';

describe('AddPaymentNetworkComponent', () => {
  let component: AddPaymentNetworkComponent;
  let fixture: ComponentFixture<AddPaymentNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPaymentNetworkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPaymentNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
