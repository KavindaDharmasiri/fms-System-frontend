import {EfmsRuleConditionDTO} from "./EfmsRuleConditionDTO";

export class EfmsRuleDTO {
  fmsRuleId?: number;
  ruleUuid?: string;
  ruleName?: string;
  description?: string;
  fromDate?: Date;
  toDate?: Date;
  status?: string;
  finalRiskScore?: number;
  finalRule?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  paymentNetworkId?: any;
  networkName?:string;
  // paymentNetwork?: PaymentNetworkDTO.ts; // Nested object
  fmsRuleConditionCollection?: EfmsRuleConditionDTO[]; // Collection<T> maps to T[]
  // transactionFlaggedRulesCollection?: TransactionFlaggedRulesDTO[]; // Collection<T> maps to T[]
  // ruleGroupRuleCollection?: RuleGroupRuleDTO[]; // Collection<T> maps to T[]
  // testTransactionFlaggedRulesCollection?: TestTransactionFlaggedRulesDTO[]; // Collection<T> maps to T[]
}

export class EfmsRuleValueDto{
  fmsElementId?:number;
  operator?:string;
  value?:string;
  riskScore?:number| undefined;
}
