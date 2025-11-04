export class AddPaymentNetworkDTO {
    paymentNetworkId?: number; // Optional, as it might not be required when creating a new entity
    networkName!: string; // Non-null assertion (!) ensures the property is initialized later
    bin!: number; // Assuming 'bin' is a numeric value
    binLength!: number; // Assuming 'binLength' is numeric
    status!: boolean;

    constructor(
        paymentNetworkId?: number,
        networkName?: string,
        bin?: number,
        binLength?: number,
        status?: boolean
    ) {
        this.paymentNetworkId = paymentNetworkId;
        this.networkName = networkName || '';
        this.bin = bin || 0;
        this.binLength = binLength || 0;
        this.status = status || false;
    }
}

export interface ListPaymentNetworkRequestDTO {
  paymentNetworkID: number | null;
  paymentNetworkName: string | null;
  bin: number | null;
  binLength: number | null;
  status: string | null;
  pageNo: number | null;
  pageSize: number | null;
}

export class PaymentNetworkReturnDTO {
  paymentNetworkId?: number; // Optional, as it might not always be provided
  networkName?: string; // Optional, depending on use case
  bin?: number; // Assuming 'bin' is a numeric value
  binLength?: number; // Assuming 'binLength' is numeric
  status?: string; // Status as a string (e.g., "Active", "Inactive")
  createdBy?: string; // Optional, as it might not always be provided
  updatedBy?: string; // Optional, as it might not always be provided
  createdAt?: Date; // Assuming 'createdAt' is a Date object
  updatedAt?: Date; // Assuming 'updatedAt' is a Date object

  constructor(
    paymentNetworkId?: number,
    networkName?: string,
    bin?: number,
    binLength?: number,
    status?: string,
    createdBy?: string,
    updatedBy?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.paymentNetworkId = paymentNetworkId;
    this.networkName = networkName;
    this.bin = bin;
    this.binLength = binLength;
    this.status = status;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
