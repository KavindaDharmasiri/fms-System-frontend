import {RuleGroupDTO} from "./RuleGroupDTO";
import {RoleDTO} from "./RoleDTO";

export class RuleGroupRoleDTO {
  ruleGroupRoleId?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  roleId?: number;
  role?: RoleDTO;
  ruleGroupId?: number;
  ruleGroup?: RuleGroupDTO;
}
