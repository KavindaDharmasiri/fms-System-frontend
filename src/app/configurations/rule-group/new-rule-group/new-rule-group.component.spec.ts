import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRuleGroupComponent } from './new-rule-group.component';

describe('NewRuleGroupComponent', () => {
  let component: NewRuleGroupComponent;
  let fixture: ComponentFixture<NewRuleGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewRuleGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewRuleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
