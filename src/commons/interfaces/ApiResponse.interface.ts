//copy from proteng_frontend
export interface ApiResponse<T = unknown> {
  code: number;
  data?: T;
  message?: string;
  error?: string;
}

export class ApiErrorResponse extends Error {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export type Params = {
  [key: string]: string | string[] | Record<string, string | null>;
};
