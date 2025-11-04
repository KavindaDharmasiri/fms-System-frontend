import {EfmsRuleDTO} from "./EfmsRuleDTO";
import {RuleGroupDTO} from "./RuleGroupDTO";

export class RuleGroupRuleDTO {
  ruleGroupRuleId?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  efmsRuleId?: number;
  efmsRule?: EfmsRuleDTO;
  ruleGroupId?: number;
  ruleGroup?: RuleGroupDTO;
}
