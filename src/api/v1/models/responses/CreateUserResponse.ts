import { Response } from "express";
import { SuccessResponse } from "./SuccessResponse";

export class CreateUserResponse {
  static handle(res: Response) {
    return SuccessResponse.handle(res, 201);
  }
}
