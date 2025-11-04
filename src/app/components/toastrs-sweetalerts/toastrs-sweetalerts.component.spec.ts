import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastrsSweetalertsComponent } from './toastrs-sweetalerts.component';

describe('ToastrsSweetalertsComponent', () => {
  let component: ToastrsSweetalertsComponent;
  let fixture: ComponentFixture<ToastrsSweetalertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastrsSweetalertsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToastrsSweetalertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
