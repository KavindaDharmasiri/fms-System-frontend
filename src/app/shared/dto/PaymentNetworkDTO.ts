import {EfmsRuleDTO} from "./EfmsRuleDTO";
import {RuleGroupDTO} from "./RuleGroupDTO";

export class PaymentNetworkDTO {
  paymentNetworkId?: number;
  networkName?: string;
  bin?: number;
  binLength?: number;
  status?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  efmsRuleCollection?: EfmsRuleDTO[];
  ruleGroupCollection?: RuleGroupDTO[];
}
