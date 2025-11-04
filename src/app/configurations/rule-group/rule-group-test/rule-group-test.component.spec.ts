import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleGroupTest } from './rule-group-test.component';

describe('RuleGroupViewComponent', () => {
  let component: RuleGroupTest;
  let fixture: ComponentFixture<RuleGroupTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuleGroupTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleGroupTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
