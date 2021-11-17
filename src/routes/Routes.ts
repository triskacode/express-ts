import { Express, Request, Response, NextFunction } from "express";
import Logger from "../config/Logger";
import UserController from "../controllers/UserController";
import { ValidationRequests } from "../middleware/ValidateRequest";
import { ErrorResponse } from "../models/responses/ErrorResponse";
import CreateUserValidator from "../validations/CreateUserValidator";

const Routes = (app: Express) => {
  app.get("/health-check", (req: Request, res: Response) => res.sendStatus(200));

  // create user
  app.post(
    "/users",
    ValidationRequests.validate(CreateUserValidator.rules()),
    UserController.create
  );

  // error fallback
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    Logger.error(err.stack);

    return ErrorResponse.handle(res, 500);
  });
};

export default Routes;
