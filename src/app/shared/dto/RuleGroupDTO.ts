import {RuleGroupRoleDTO} from "./RuleGroupRoleDTO";
import {RuleGroupRuleDTO} from "./RuleGroupRuleDTO";
import {PaymentNetworkDTO} from "./PaymentNetworkDTO";
import {ReactionTemplateDTO} from "./ReactionTemplateDTO";

export class RuleGroupDTO {
  ruleGroupId?: number;
  ruleGroupUuid?: string;
  groupName?: string;
  verdict?: string;
  fromDate?: Date;
  toDate?: Date;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  ruleCount?: number;
  // transactionFlaggedRulesCollection?: TransactionFlaggedRulesDTO[];
  ruleGroupRuleCollection?: RuleGroupRuleDTO[];
  ruleGroupRoleCollection?: RuleGroupRoleDTO[];
  // testTransactionFlaggedRulesCollection?: TestTransactionFlaggedRulesDTO[];
  paymentNetworkId?: number;
  paymentNetwork?: PaymentNetworkDTO;
  reactionTemplateId?: number;
  reactionTemplate?: ReactionTemplateDTO;
}
