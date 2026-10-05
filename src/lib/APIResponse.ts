export class APIResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;

  constructor(
    message: string,
    statusCode: number,
    data: T
  ) {
    this.success = statusCode >= 200 && statusCode < 300;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}