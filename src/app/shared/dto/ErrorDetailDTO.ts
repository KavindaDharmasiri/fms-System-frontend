export class ErrorDetailDTO {
  code!: string; // Assuming ErrorCode is an enum or a string type
  message!: string;
  field!: string|null;
}
