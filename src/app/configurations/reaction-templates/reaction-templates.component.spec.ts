import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionTemplatesComponent } from './reaction-templates.component';

describe('ReactionTemplatesComponent', () => {
  let component: ReactionTemplatesComponent;
  let fixture: ComponentFixture<ReactionTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactionTemplatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReactionTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
