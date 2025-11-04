import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAlertingTemplatesComponent } from './new-alerting-templates.component';

describe('NewAlertingTemplatesComponent', () => {
  let component: NewAlertingTemplatesComponent;
  let fixture: ComponentFixture<NewAlertingTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAlertingTemplatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewAlertingTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
