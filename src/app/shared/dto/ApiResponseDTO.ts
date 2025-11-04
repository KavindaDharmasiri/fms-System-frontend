import {ErrorDetailDTO} from "./ErrorDetailDTO";

export class ApiResponseDTO<T> {
  success!: boolean;
  data!: T | null;
  errors!: ErrorDetailDTO[] | null;
  metadata!: {
    pagination?: {
      totalElements: number;
      totalPages: number;
      pageNumber: number;
      pageSize: number;
      isLast: boolean;
      isFirst: boolean;
      isEmpty: boolean;
    };
    timestamp: string;
    version: string;
    requestId: string;
    path: string;
  } | null;
}
