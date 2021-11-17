import { Request, Response } from "express";
import { ValidationError } from "yup";
import Logger from "../../../config/Logger";
import { CreateUserResponse } from "../models/responses/CreateUserResponse";
import { ErrorResponse } from "../models/responses/ErrorResponse";
import UserService from "../services/UserService";
import { ValidationErrorResponse } from "../models/responses/ValidationErrorResponse";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const isSuccessfullStoredUser = await UserService.createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      if (isSuccessfullStoredUser) {
        return CreateUserResponse.handle(res);
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

export default new UserController();
