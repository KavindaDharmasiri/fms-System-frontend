export interface UsernameForSelectorDTO {
  fullName: string;
  username: string;
}

export class FilterDualAuthentication {
  from: Date | string | null;       // Can be a Date object or ISO string
  to: Date | string | null;
  configuration: string | null;     // e.g., "Rule ID", "Rule Group ID"
  task: string | null;              // e.g., "Add Rule", "Delete Element"
  modifiedUser: string | null;      // e.g., "User01", "User02"
  pageNo: number;            // Current page index (zero-based)
  pageSize: number;          // Number of items per page

  constructor(
    from: Date | string = '',
    to: Date | string = '',
    configuration: string = '',
    task: string = '',
    modifiedUser: string = '',
    pageNo: number = 0,
    pageSize: number = 10
  ) {
    this.from = from;
    this.to = to;
    this.configuration = configuration;
    this.task = task;
    this.modifiedUser = modifiedUser;
    this.pageNo = pageNo;
    this.pageSize = pageSize;
  }
}
export class RejectDualAuthDTO {
  identifier: string;
  rejectReason: string;

  constructor(
    identifier:string,
    rejectReason:string
  ) {
    this.identifier = identifier;
    this.rejectReason = rejectReason;
  }
}
export interface DualAuthDTO {
  identifier: string;
  task: string;
  modifiedUser: string;
  modifiedDate: Date | string; // ISO string or JS Date object
  createdDate: Date | string;  // ISO string or JS Date object
}
export interface ParameterDTO {
  parameterName: string;
  oldValue: string;
  newValue: string;
}
export interface DualAuthResponseDTO {
  configuration: string;
  task: string;
  lastModifiedUser: string;
  newModifiedUser: string;
  parameterDTOList: ParameterDTO[];
}
