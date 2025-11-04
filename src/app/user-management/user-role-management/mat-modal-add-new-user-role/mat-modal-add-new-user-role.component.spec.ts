import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatModalAddNewUserRoleComponent } from './mat-modal-add-new-user-role.component';

describe('MatModalAddNewUserRoleComponent', () => {
  let component: MatModalAddNewUserRoleComponent;
  let fixture: ComponentFixture<MatModalAddNewUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatModalAddNewUserRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatModalAddNewUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
