import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DualAuthComponent } from './dual-auth.component';

describe('DualAuthComponent', () => {
  let component: DualAuthComponent;
  let fixture: ComponentFixture<DualAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DualAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DualAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
