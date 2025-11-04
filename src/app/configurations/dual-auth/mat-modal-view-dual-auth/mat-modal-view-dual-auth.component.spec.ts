import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatModalViewDualAuthComponent } from './mat-modal-view-dual-auth.component';

describe('MatModalViewDualAuthComponent', () => {
  let component: MatModalViewDualAuthComponent;
  let fixture: ComponentFixture<MatModalViewDualAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatModalViewDualAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatModalViewDualAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
