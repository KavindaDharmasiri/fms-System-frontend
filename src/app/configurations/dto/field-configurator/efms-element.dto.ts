import {FieldDependenciesDTO} from "./field-dependencies.dto";

export interface EfmsElementDTO {
  efmsElementId: number;
  paymentNetworkId: number;
  networkName: string;
  elementCode: string;
  elementName: string;
  variableName: string;
  validation: string;
  validationMessage: string;
  riskWeight: number;

  description: string;
  operator: string;
  value: string;
  status: string;
  created: Date;
  updated: Date;
  createdBy: string;
  updatedBy: string;

  fieldDependenciesCollection: FieldDependenciesDTO[];
}
