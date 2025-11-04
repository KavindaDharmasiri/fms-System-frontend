import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {AppUserPrivilegesServiceService} from "../services/user-privileges-service/app-user-privileges-service.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

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
  selector: 'app-add-privilege',
  templateUrl: './add-privilege.component.html',
  styleUrl: './add-privilege.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddPrivilegeComponent implements OnInit{
    roles: any[] = [];
    private allData: any[] = [];
    pages: string[] = [];
    sections: string[] = [];
    tasks: string[] = [];
    isFilterOpen = false;
    selectedUserRole: number | null = null;
    selectedPage: string | null = null;
    selectedSection: string | null = null;
    selectedTask: string | null = null;
    viewContent = false;
    pagesDroDown = true;
    updatedData: any;
    ngOnInit(): void {
        this.loadFiler()
    }

    constructor(
      private user_privileges_service : AppUserPrivilegesServiceService,
      private router: Router
    ) {
    }

    loadFiler(){
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

        // this.user_privileges_service.getAllSections().subscribe({
        //     next: (sections: string[])=>{
        //         console.log('Sections received from backend:', sections);
        //         this.sections = sections
        //     },
        //     error: (err) => {
        //         console.error('Error fetching pages:', err);
        //     }
        // })
        //
        // this.user_privileges_service.getAllTasks().subscribe({
        //     next: (tasks: string[])=>{
        //         console.log('Tasks received from backend:', tasks);
        //         this.tasks = tasks
        //     },
        //     error: (err) => {
        //         console.error('Error fetching pages:', err);
        //     }
        // })
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
    this.selectedSection = null;
    this.selectedTask = null;
    this.pagesDroDown = true;
    this.viewContent = false;
  }

    searchPrivileges(): void {
        const selectedRole = this.roles.find(role => role.roleId == this.selectedUserRole);
        this.viewContent = true;
        this.user_privileges_service.getAllPrivileges(selectedRole.roleId).subscribe({
            next: (response: any) => {
                this.allData = response;
                this.generateTreeData();
            },
            error: (err) => {
                console.error('Error fetching privileges:', err);
            }
        });
    }

    generateTreeData(): void {
        this.updatedData = typeof this.allData === 'string' ? JSON.parse(this.allData) : this.allData;
        const filteredPages = this.selectedPage
            ? this.updatedData.pageDTOList.filter((page: any) => page.pageCode === this.selectedPage)
            : this.updatedData.pageDTOList;

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
    }


    onRoleSelected(): void {
        if (this.selectedUserRole != null) {
            this.searchPrivileges();
            this.pagesDroDown = false;
        }
    }
    onPageSelected(): void {
        if (this.selectedPage != null) {
            this.generateTreeData();
        }
    }

    // onSectionSelected(): void {
    //     if (this.selectedPage != null) {
    //         this.generateTreeData();
    //     }
    // }
    //
    // onTaskSelected(): void {
    //     if (this.selectedPage != null) {
    //         this.generateTreeData();
    //     }
    // }
    protected readonly onsubmit = onsubmit;

  togglePermission(node: FlatNode): void {
    node.permissionStatus = !node.permissionStatus;

    const page = this.updatedData.pageDTOList.find((p: any) => p.pageCode === node.name);
    if (page) {
      page.permissionStatus = node.permissionStatus;
      return;
    }

    this.updatedData.pageDTOList.forEach((p: any) => {
      const section = p.sectionDtoList.find((s: any) => s.sectionCode === node.name);
      if (section) {
        section.permissionStatus = node.permissionStatus;
        return;
      }

      p.sectionDtoList.forEach((s: any) => {
        const privilege = s.privileges.find((priv: any) => priv.permissionCode === node.name);
        if (privilege) {
          privilege.permissionStatus = node.permissionStatus;
        }
      });
    });
    this.treeControl.expandDescendants(node);
  }
  toggleParentPermission(node: FlatNode){
    node.permissionStatus = !node.permissionStatus;
    const descendants = this.treeControl.getDescendants(node);

    descendants.forEach(child => {
      child.permissionStatus = node.permissionStatus;
      this.updateModelPermission(child.name, node.permissionStatus!);
    });

    this.updateModelPermission(node.name, node.permissionStatus!);
    this.treeControl.expandDescendants(node);
  }

  private updateModelPermission(name: string, status: boolean): void {
    this.updatedData.pageDTOList.forEach((p: any) => {
      if (p.pageCode === name) {
        p.permissionStatus = status;
        return;
      }

      p.sectionDtoList.forEach((s: any) => {
        if (s.sectionCode === name) {
          s.permissionStatus = status;
          s.privileges.forEach((priv: any) => priv.permissionStatus = status);
          return;
        }

        s.privileges.forEach((priv: any) => {
          if (priv.permissionCode === name) {
            priv.permissionStatus = status;
          }
        });
      });
    });
  }
    onSubmit() {
      this.user_privileges_service.updatePrivilage(this.updatedData).subscribe({
        next: () => {
          Swal.fire('Success', 'Privileges updated successfully', 'success');
          this.router.navigate(['/user-management/user-privileges']);
        },
        error: () => {
          Swal.fire('Error', 'Failed to update privileges', 'error');
        }
      });
    }
}
