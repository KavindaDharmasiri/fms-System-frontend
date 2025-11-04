import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleConfigurationPageComponent } from './rule-configuration-page.component';

describe('RuleConfigurationPageComponent', () => {
  let component: RuleConfigurationPageComponent;
  let fixture: ComponentFixture<RuleConfigurationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuleConfigurationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RuleConfigurationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
