import { Response } from "express";

export class ErrorResponse {
  static handle(res: Response, code: number, errors?: any[]) {
    return res.status(code).json({
      statusCode: code,
      errors,
    });
  }
}
