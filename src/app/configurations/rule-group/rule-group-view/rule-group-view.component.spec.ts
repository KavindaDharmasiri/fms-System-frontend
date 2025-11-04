import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleGroupViewComponent } from './rule-group-view.component';

describe('RuleGroupViewComponent', () => {
  let component: RuleGroupViewComponent;
  let fixture: ComponentFixture<RuleGroupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuleGroupViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RuleGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
