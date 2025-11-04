export class RoleDTO {
  roleId?: number; // Optional property (?), as it may not be required when creating a new role
  roleName?: string;
  roleCode?: string;
  createdAt?: Date; // Use JavaScript Date type for date fields
  updatedAt?: Date;
  status?: string;
  createdBy?: string;
  updatedBy?: string;
}

export class GetAllRolesRequestDTO {
  page?: number; // Optional property (?), as it may not always be required
  size?: number; // Optional property (?), as it may not always be required
  roleCode?: string; // Optional property (?)
  roleName?: string; // Optional property (?)
  status?: string; // Optional property (?)
}
