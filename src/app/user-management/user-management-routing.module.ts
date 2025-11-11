import { SystemUsersComponent } from './system-user-management/system-users/system-users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserRoleComponent } from './user-role-management/user-role/user-role.component';
import { AddSystemUsersComponent } from './system-user-management/add-system-users/add-system-users.component';
import {SystemUserComponent} from "./system-user-management/system-user/system-user.component";
import { AuditManagementComponent } from './audit-management/audit-management.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'user-privileges',
        loadChildren: () => import('./privilege-management/privilege-management.module').then((m) => m.PrivilegeManagementModule),
        data: { title: 'Privilege Management' }
      },
      // user management route //
      {
        path: 'user-role',
        component: UserRoleComponent,
        data: { title: 'User Role Management' }
      },
      // user management route ends //

      // system user management route //
      {
        path: 'system-users',
        component: SystemUsersComponent,
        data: { title: 'System User Management' }
      },
      {
        path: 'add-system-user/:action/:id',
        component: AddSystemUsersComponent,
      },
      // system user management route ends //

      // audit management route //
      {
        path: 'audit-logs',
        component: AuditManagementComponent,
        data: { title: 'Audit Management' }
      },
      // audit management route ends //

      // privilege management route //
      // {
      //   path: 'user-privileges',
      //   component: UserPrivilegesComponent,
      // },
      // {
      //   path: 'add-privilege',
      //   component: AddPrivilegeComponent,
      // },

      // privilege management ends //
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
