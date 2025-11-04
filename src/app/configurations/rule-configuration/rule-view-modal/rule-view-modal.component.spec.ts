import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleViewModalComponent } from './rule-view-modal.component';

describe('RuleViewModalComponent', () => {
  let component: RuleViewModalComponent;
  let fixture: ComponentFixture<RuleViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuleViewModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RuleViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
