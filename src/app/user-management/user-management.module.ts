import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserRoleComponent } from './user-role-management/user-role/user-role.component';
import { AddSystemUsersComponent } from './system-user-management/add-system-users/add-system-users.component';
import { UserPrivilegesComponent } from './privilege-management/user-privileges/user-privileges.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatDivider} from "@angular/material/divider";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSelect} from "@angular/material/select";
import {MatPaginator} from "@angular/material/paginator";
import {MatInput, MatInputModule} from "@angular/material/input";
import { MatModalAddNewUserRoleComponent } from './user-role-management/mat-modal-add-new-user-role/mat-modal-add-new-user-role.component';
import { MatModalViewUserRoleComponent } from './user-role-management/mat-modal-view-user-role/mat-modal-view-user-role.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import { AddPrivilegeComponent } from './privilege-management/add-privilege/add-privilege.component';
import {SystemUsersComponent} from "./system-user-management/system-users/system-users.component";
import { SystemUserComponent } from './system-user-management/system-user/system-user.component';
import {MatDatepicker, MatDatepickerInput} from "@angular/material/datepicker";
import {MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding} from "@angular/material/tree";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import { AuditManagementComponent } from './audit-management/audit-management.component';


@NgModule({
  declarations: [
    UserRoleComponent,
    SystemUsersComponent,
    AddSystemUsersComponent,
    UserPrivilegesComponent,
    MatModalAddNewUserRoleComponent,
    MatModalViewUserRoleComponent,
    AddPrivilegeComponent,
    SystemUserComponent,
    AuditManagementComponent,
  ],
    imports: [
        CommonModule,
        UserManagementRoutingModule,
        ReactiveFormsModule,
        MatLabel,
        MatFormFieldModule,
        MatOption,
        MatDivider,
        MatTable,
        MatHeaderCell,
        MatCell,
        MatColumnDef,
        MatHeaderCellDef,
        MatCellDef,
        MatSelect,
        MatPaginator,
        MatRowDef,
        MatHeaderRowDef,
        MatInputModule,
        MatHeaderRow,
        MatRow,
        MatDialogTitle,
        MatDialogClose,
        MatDialogContent,
        FormsModule,
        MatSlideToggle,
        MatDialogActions,
        MatDatepickerInput,
        MatDatepicker,
        MatTree,
        MatTreeNode,
        MatTreeNodeDef,
        MatTreeNodePadding,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        HttpClientModule,
    ]
})
export class UserManagementModule { }
