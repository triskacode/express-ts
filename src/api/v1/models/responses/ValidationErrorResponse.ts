import { Response } from "express";
import { ErrorResponse } from "./ErrorResponse";

export class ValidationErrorResponse {
  static handle(res: Response, errors: any[]) {
    return ErrorResponse.handle(res, 400, errors);
  }
}
