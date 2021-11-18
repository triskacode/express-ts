import { Response } from "express";

export class ErrorResponse {
  static handle(
    res: Response,
    code: number,
    errors?: any
  ): Response {
    return res.status(code).json({
      statusCode: code,
      errors,
    });
  }
}
