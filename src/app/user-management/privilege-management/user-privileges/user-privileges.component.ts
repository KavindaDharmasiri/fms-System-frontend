import {Component, input, OnInit, ViewEncapsulation} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {AppUserPrivilegesServiceService} from "../services/user-privileges-service/app-user-privileges-service.service";
import Swal from 'sweetalert2';


interface TreeNode {
  name: string;
  level: number;
  children?: TreeNode[];
  permissionStatus?: boolean;
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  permissionStatus?: boolean;
}

@Component({
  selector: 'app-user-privileges',
  templateUrl: './user-privileges.component.html',
  styleUrl: './user-privileges.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UserPrivilegesComponent implements OnInit{
  roles: any[] = [];
  pages: string[] = [];
  isFilterOpen = true;
  selectedUserRole: number | null = null;
  selectedPage: string | null = null;
  viewContent = false;
  ngOnInit(): void {
    this.loadRoleNameAndPages()
  }

  constructor(private user_privileges_service : AppUserPrivilegesServiceService) {
  }
  // columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  loadRoleNameAndPages(){
    this.user_privileges_service.getAllRoleNames().subscribe({
      next: (roles) => {
        console.log('Roles received from backend:', roles);
        this.roles = roles;
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      }
    });

    this.user_privileges_service.getAllPages().subscribe({
      next: (pages: string[])=>{
        console.log('Pages received from backend:', pages);
        this.pages = pages
      },
      error: (err) => {
        console.error('Error fetching pages:', err);
      }
    })
  }

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  treeControl = new FlatTreeControl<FlatNode>(
      node => node.level,
      node => node.expandable
  );

  treeFlattener = new MatTreeFlattener<TreeNode, FlatNode>(
      (node: TreeNode, level: number): FlatNode => ({
        name: node.name,
        level: level,
        expandable: !!node.children && node.children.length > 0,
        permissionStatus: node.permissionStatus
      }),
      node => node.level,
      node => true,
      node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  hasChild = (_: number, node: FlatNode) => node.expandable;


  resetFilters(): void {
    this.selectedUserRole = null;
    this.selectedPage = null;
    this.viewContent = false;
  }

  searchPrivileges(): void {
    if(this.selectedUserRole != null){
      const selectedRole = this.roles.find(role => role.roleId == this.selectedUserRole);
      this.viewContent = true;

      this.user_privileges_service.getAllPrivileges(selectedRole.roleId).subscribe({
        next: (response: any) => {
          const filteredPages = this.selectedPage
            ? response.pageDTOList.filter((page: any) => page.pageCode === this.selectedPage)
            : response.pageDTOList;

          const treeData: TreeNode[] = filteredPages.map((page: any) => {
            const children = page.sectionDtoList.map((section: any) => {
              const childPrivileges = section.privileges.map((priv: any) => ({
                name: priv.permissionCode,
                level: 2,
                permissionStatus: priv.permissionStatus
              }));

              const sectionStatus = childPrivileges.every((p: { permissionStatus: boolean }) => p.permissionStatus === true);

              return {
                name: section.sectionCode,
                level: 1,
                permissionStatus: sectionStatus,
                children: childPrivileges
              };
            });

            const pageStatus = children.every((s: { permissionStatus: boolean }) => s.permissionStatus === true);

            return {
              name: page.pageCode,
              level: 0,
              permissionStatus: pageStatus,
              children
            };
          });

          this.dataSource.data = treeData;
          console.log('Filtered tree data:', treeData);
        },
        error: (err) => {
          console.error('Error fetching privileges:', err);
        }
      });
    }else {
      Swal.fire({
        icon: 'warning',
        title: 'No Role Selected',
        text: 'Please select a user role before searching for privileges.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  }
}

