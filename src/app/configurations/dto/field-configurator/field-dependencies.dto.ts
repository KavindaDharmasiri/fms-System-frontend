export interface FieldDependenciesDTO {
  fieldDependenciesId: number;
  mainOperator: string;
  value: string;
  depOperator: string;
  depValue: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  depElementId: number;
  depElement: number;
  efmsElementId: number;
  efmsElement: number;
}
