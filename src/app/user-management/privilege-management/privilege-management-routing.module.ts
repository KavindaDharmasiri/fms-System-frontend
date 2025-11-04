import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserPrivilegesComponent} from "./user-privileges/user-privileges.component";
import {AddPrivilegeComponent} from "./add-privilege/add-privilege.component";

const routes: Routes = [

      {
        path: '',
        component: UserPrivilegesComponent
      },
      {
        path: 'add-privilege',
        component: AddPrivilegeComponent
      }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivilegeManagementRoutingModule { }
