import { Response } from "express";

export class SuccessResponse {
  static handle(res: Response, code: number, data?: any[]) {
    return res.status(code).json({
      statusCode: code,
      data,
    });
  }
}
