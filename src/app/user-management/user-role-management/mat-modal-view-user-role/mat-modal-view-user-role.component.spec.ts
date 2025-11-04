import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatModalViewUserRoleComponent } from './mat-modal-view-user-role.component';

describe('MatModalViewUserRoleComponent', () => {
  let component: MatModalViewUserRoleComponent;
  let fixture: ComponentFixture<MatModalViewUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatModalViewUserRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatModalViewUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
