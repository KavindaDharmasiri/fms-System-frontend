import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleTestingValidationComponent } from './rule-testing-validation.component';

describe('RuleTestingValidationComponent', () => {
  let component: RuleTestingValidationComponent;
  let fixture: ComponentFixture<RuleTestingValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuleTestingValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RuleTestingValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
