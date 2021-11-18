import { Request, Response } from "express";
import { ValidationError } from "yup";
import { Logger } from "../config/Logger";
import { ErrorResponse } from "../responses/ErrorResponse";
import { UserService } from "../services/UserService";
import { ValidationErrorResponse } from "../responses/ValidationErrorResponse";
import { SuccessResponse } from "../responses/SuccessResponse";

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const isSuccessfullStoredUser = await UserService.createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      if (isSuccessfullStoredUser) {
        return SuccessResponse.handle(res, 201);
      } else {
        return ErrorResponse.handle(res, 500);
      }
    } catch (error) {
      Logger.error(error);

      if (error instanceof ValidationError) {
        return ValidationErrorResponse.handle(res, error.errors);
      }

      return ErrorResponse.handle(res, 500);
    }
  }
}
