import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRuleConfigurationComponent } from './add-rule-configuration.component';

describe('AddRuleConfigurationComponent', () => {
  let component: AddRuleConfigurationComponent;
  let fixture: ComponentFixture<AddRuleConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRuleConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRuleConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
