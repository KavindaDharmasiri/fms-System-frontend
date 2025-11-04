export class ValidateTransactionDTO {
  page?: number;
  size?: number;
  validateTransactionId?: number;
  isValid?: boolean;
  errorMessage?: string;
  transactionTime?: string;
  fromTransactionTime?: string;
  toTransactionTime?: string;
  isoMessage?: string;
}
