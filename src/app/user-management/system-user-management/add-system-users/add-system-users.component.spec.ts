import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSystemUsersComponent } from './add-system-users.component';

describe('AddSystemUsersComponent', () => {
  let component: AddSystemUsersComponent;
  let fixture: ComponentFixture<AddSystemUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSystemUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSystemUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
