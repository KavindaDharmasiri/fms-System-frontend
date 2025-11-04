import {RuleGroupDTO} from "./RuleGroupDTO";

export class ReactionTemplateDTO {
  reactionTemplateId?: number;
  templateUuid?: string;
  templateName?: string;
  subject?: string;
  status?: string;
  smsEnabled?: string;
  emailEnabled?: string;
  smsBody?: string;
  emailBody?: string;
  includedFlaggedRules?: string;
  frmEnabled?: string;
  frmBody?: string;
  ruleGroupCollection?: RuleGroupDTO[];
  // reactionTemplateRoleCollection?: ReactionTemplateRoleDTO[];
  roleids?: any;
  user?: string;
}
