import { Request, Response } from "express";
import { ValidationError } from "yup";
import { Logger } from "../config/Logger";
import { ErrorResponse } from "../responses/ErrorResponse";
import { SuccessResponse } from "../responses/SuccessResponse";
import { ValidationErrorResponse } from "../responses/ValidationErrorResponse";
import { SessionService } from "../services/SessionService";
import { UserService } from "../services/UserService";

export class SessionController {
  static async createSession(req: Request, res: Response) {
    try {
      const user = await UserService.validatePassword({
        email: req.body.email,
        password: req.body.password,
      });

      const accessToken = await SessionService.createAccessToken({
        user: user._id,
      });

      return SuccessResponse.handle(res, 200, {
        token: accessToken.token,
      });
    } catch (error) {
      Logger.error(error);

      if (error instanceof ValidationError) {
        return ValidationErrorResponse.handle(res, error.errors);
      }

      return ErrorResponse.handle(res, 500);
    }
  }
}
